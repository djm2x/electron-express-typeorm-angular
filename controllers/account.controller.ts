import { JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError, UseBefore } from 'routing-controllers';
import { User } from '../model/models';
import Container from 'typedi';
import { JwtService } from '../services/jwt.service';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { getRepository } from 'typeorm';

@JsonController('/accounts')
// @UseBefore(JwtMiddleware)
export class AccountController {

  private service = getRepository(User);
  private jwt = Container.get(JwtService);

  @Post('/login')
  async login(@Body() model: User) {
    const user = await this.service.findOne({ where: { email: model.email } });

    if (user == null) {
      return { code: -1, message: 'Email érroné' };
    } else if (user.password !== model.password) {
      return { code: -1, message: 'Mot de passe érroné' };
    }

    user.password = '';

    const token = this.jwt.createToken(user as User);

    return { code: 1, user, token, message: 'Connexion reussite' };
  }

  @Post('/login2')
  async login2(@Body() model: User) {
    try {
      const user = await this.service.findOneOrFail({ where: { email: model.email, password: model.password } });

      user.password = '';

      const token = this.jwt.createToken(user as User);

      return { user, token };

    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }

  @Post('/create')
  async create(@Body() user: User) {
    return await this.service.save(user);
  }

}
