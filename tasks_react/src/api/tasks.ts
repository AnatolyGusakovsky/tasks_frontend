// implement CRUD here. use interfaces. Look at LF in uc-frontend as an example.
// Given the ease of use, and to avoid common bugs related to this binding, the arrow function syntax is used for API call methods
// This approach aligns well with React's patterns and makes components easier to manage.

import axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults} from 'axios';
import { Program } from 'utils/customTypes';
import {api_url} from "../config";

class ProgramAPI {
  private instance: AxiosInstance;

  constructor() {
    // Syntax seems to be correct. Not sure why this error appears
    this.instance = axios.create({baseURL: api_url});
  }

  fetchTasks = async () => {
    // check if response contains "data". If no - try to add as it looks like it's common practice
    // try to return typed 'data" using Task interface (look at recent chatGPT dialogue related to structure)
    const { data } = await this.instance.get(
      `tasks`
    );
    return data;
  };

  fetchProjectsForProgram = async (programId: string) => {
    const { data } = await this.instance.get(
      `program/${programId}/retrieveProjectsForProgram`
    );
    return data;
  };

  updateProgram = async (programId: string, updateFields: Partial<Program>) => {
    const response = await this.instance.put(
      `program/updateProgram/${programId}`,
      { updateFields }
    );
    if (response.data) {
      return response.data;
    }
    return get(response, 'response.data');
  };

  updateProgramOwners = async (programId: string, ownersIds: string[]) => {
    const response = await this.instance.post(
      `program/${programId}/setOwners`,
      {
        ownersIds,
      }
    );
    if (response.data) {
      return response.data;
    }
    return get(response, 'response.data');
  };

  updateProgramProjects = async (programId: string, projectIds: string[]) => {
    const response = await this.instance.post(
      `program/${programId}/setProjects`,
      {
        projectIds,
      }
    );
    if (response.data) {
      return response.data;
    }
    return get(response, 'response.data');
  };
}

const programAPI = new ProgramAPI();

export default programAPI;
