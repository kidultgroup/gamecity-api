import { Body, Controller, Post, Request, Session } from '@nestjs/common';
import { Public } from 'src/user/metas/public.meta';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: SigninDto, @Session() session) {
    const res = await this.authService.agentValidate(body);
    session.user = res.user;
    session.permissions = res.permissions;
    return {
      ...res.user,
      menu: res.menu,
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    req.session.user = null;
    return { success: true };
  }
}
