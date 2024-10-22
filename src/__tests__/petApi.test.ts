import axios from 'axios';
import { fetchPetProfile, addHealthRecord } from '../api/petApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('petApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetchPetProfile returns data on success', async () => {
    const mockData = { id: '1', name: 'Max', species: 'Dog' };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchPetProfile('1');
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.bienpet.com/pets/1');
  });

  it('addHealthRecord sends correct data', async () => {
    const mockRecord = { date: '2023-07-01', weight: 10, notes: 'Annual checkup' };
    mockedAxios.post.mockResolvedValue({ data: { id: '1', ...mockRecord } });

    const result = await addHealthRecord('1', mockRecord);
    expect(result).toEqual({ id: '1', ...mockRecord });
    expect(mockedAxios.post).toHaveBeenCalledWith('https://api.bienpet.com/pets/1/health-records', mockRecord);
  });
});