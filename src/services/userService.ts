import { User } from '../store/userSlice';
import api from './api';

interface RandomUserResponse {
  results: Array<{
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: number;
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: {
      date: string;
      age: number;
    };
    registered: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    id: {
      name: string;
      value: string;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export const userService = {
  async fetchUsers(count: number = 10): Promise<User[]> {
    try {
      const response = await api.get<RandomUserResponse>(`/?results=${count}`);

      const transformedUsers: User[] = (response.data?.results ?? []).map(
        user => ({
          id: user.login?.uuid ?? '',
          name: `${user.name?.first ?? ''} ${user.name?.last ?? ''}`,
          email: user.email ?? '',
          phone: user.phone ?? '',
          picture: {
            large: user.picture?.large ?? '',
            medium: user.picture?.medium ?? '',
            thumbnail: user.picture?.thumbnail ?? '',
          },
          location: `${user.location?.city ?? ''}, ${
            user.location?.country ?? ''
          }`,
        }),
      );

      return transformedUsers;
    } catch (error) {
      throw new Error('Failed to fetch users from API');
    }
  },
};

export default userService;
