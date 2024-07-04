import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { TIBIA_DATA_API } from '../../../../common/constants';
import { ApiResponse } from '../../../../dashboard/domain/interfaces/guilds.interface';

@Injectable()
export class GetGuildsTibiaDataUseCase {
  async getGuilds(): Promise<ApiResponse> {
    const url = `${TIBIA_DATA_API}/v4/guild/Tornabra Encore`;

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, { headers });

      return response.data;
    } catch (error) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new HttpException(
        'Error on get tibia data api.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
