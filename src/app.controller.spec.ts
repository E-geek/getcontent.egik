import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('loadPage', () => {
    it('should return page content for a valid URL', async () => {
      const url = 'https://nodejs.org/';
      const response = await appController.loadPage(url);
      expect(response).toHaveProperty('data');
      expect(response.data).toContain('<!DOCTYPE html>');
    });

    it('should return an error for an invalid URL', async () => {
      const url = 'https://warya-batya.egik/';
      const response = await appController.loadPage(url);
      expect(response).toHaveProperty('error');
      expect(response.error).toContain('Failed to load page');
    });
  });
});
