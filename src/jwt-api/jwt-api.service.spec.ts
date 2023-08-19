import { Test, TestingModule } from '@nestjs/testing';
import { JwtApiService } from './jwt-api.service';

describe('JwtApiService', () => {
  let service: JwtApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtApiService],
    }).compile();

    service = module.get<JwtApiService>(JwtApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
