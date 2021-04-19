import { Controller, Get } from '@nestjs/common';
import { RequiredScopes, UseAuth0Guard } from 'src/common/required-scopes.decorator';

@Controller('/')
export class AppController {
  @Get('/products')
  @UseAuth0Guard()
  @RequiredScopes('read:products', 'read:products')
  public async returnTheContext() {
    return true;
  }
}
