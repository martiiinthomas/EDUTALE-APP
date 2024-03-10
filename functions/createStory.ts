import { NavigationProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateStoryProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: NavigationProp<any>,
  location: string,
  characters: {name: string, animal: string}[]
};

export const createStory = async ({ setLoading, navigation, location, characters }: CreateStoryProps) => {
  setLoading(true);
  console.log("running script")
  const prompt = createPrompt(location, characters)
  const assistant = await createAssistant();
  const run = await createThreadAndRun(assistant.id, prompt);
  await checkRunStatus(run.thread_id, run.id); 
  const message = await retrieveMessage(run.thread_id);

  for (let content of message.data) {
    if (content.assistant_id) {
      const storyKey = `story_${run.id}`;
      const storyObject = {
        title: 'Story Title',
        content: content.content[0].text.value,
      };
      console.log("Story", storyObject);
      await AsyncStorage.setItem(storyKey, JSON.stringify(storyObject));
      setLoading(false);
      navigation.navigate('Story', { story: content.content[0].text.value });
    }
  }
};

function createPrompt(location:string, characters:{name: string, animal: string}[]) {
  const charactersDescriptions = characters.map(character => {
    return `A ${character.animal} named ${character.name}`;
  });

  const prompt = `${charactersDescriptions.join(', ')}. The location is: ${location}`;

  return prompt;
}

const createAssistant = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/assistants',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1',
      },
      data: {
        instructions: "You are an education ai, expertly tailored to generate entertaining and fascinating stories around topics I give you. Make it readable for a 6 year old child. Fill the story with random facts about the topic. Give it an interesting plot. The objective is education through immersive story telling. Keep the story short and the facts should be introduced organically.",
        name: "Math Tutor",
        model: "gpt-4-1106-preview"
      }
    });
    console.log("Assistant Created");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error creating assistant:', axiosError.response?.data);
    return null;
  }
};

const createThreadAndRun = async (assistantId: any, prompt:string) => {
  try {
    console.log("Creating Thread")
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/threads/runs',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1',
      },
      data: {
        assistant_id: assistantId,
        thread: {
          messages: [{
            role: "user",
            content: prompt,
          }]
        }
      }
    });
    console.log("Created Thread and Run");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error creating thread:', axiosError.response ? axiosError.response.data : axiosError.message);
    return null;
  }
};

const retrieveRun = async (threadId: any, runId: any): Promise<any> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1',
      }
    });
    console.log("Retrieve Run Status: ", response.data.status);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error creating thread:', axiosError.response ? axiosError.response.data : axiosError.message);
    return null;
  }
};

const retrieveMessage = async (threadId: any): Promise<any> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.openai.com/v1/threads/${threadId}/messages`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1',
      }
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error creating thread:', axiosError.response ? axiosError.response.data : axiosError.message);
    return null;
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const checkRunStatus = async (threadId: any, runId: any) => {
  const runStatus = await retrieveRun(threadId, runId);
  console.log("Checking...")
  if (runStatus && runStatus.status === 'completed') {
    console.log("Complete")
    return;
  } else {
    await delay(2000);
    await checkRunStatus(threadId, runId);
  }
};