import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { GymController } from './gym.controller';
import { expect } from 'chai';

describe('GymController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        GymController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: GymController;
  beforeEach(() => {
    controller = module.get(GymController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
