import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { User } from '../model/models';
import { FindConditions, FindManyOptions, getRepository, Like } from 'typeorm';
import { SuperController } from './super.controller';

@JsonController('/users')
// @UseBefore(MyMiddleware)
export class UserController extends SuperController<User> {

  constructor() {
    super(User);
  }

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:name/:email/:role')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('sortBy') sortBy, @Param('sortDir') sortDir, @Param('name') name, @Param('email') email, @Param('role') role) {

    const where: FindConditions<User> = {
      name: Like(`%${name === '*' ? '' : name}%`),
      email: Like(`%${email === '*' ? '' : email}%`),
      role: Like(`%${role === '*' ? '' : role}%`),
    };
    const opts: FindManyOptions<User> = {
      skip: startIndex,
      take: pageSize,
      order: { [sortBy]: sortDir.toUpperCase() as any },
      // where: where,
    }

    const r = await this.service.createQueryBuilder('p')
      .where(name === '*' ? '1=1' : `name LIKE :name`, { name })
      .where(email === '*' ? '1=1' : `email LIKE :email`, { email })
      .where(role === '*' ? '1=1' : `role LIKE :role`, { role })
      .skip(startIndex)
      .take(pageSize)
      .orderBy(sortBy, sortDir.toUpperCase())
      .getManyAndCount()
      ;

    // console.log(where)

    // const r = await this.service.findAndCount(opts);

    return { list: r[0], count: r[1] };
  }

  // @Post('/post')
  // async post(@Body() model: User) {
  //   model.id = null;
  //   return await this.service.save(model);
  // }

  // @Put('/put/:id')
  // async put(@Param('id') id: number, @Body() model: User) {
  //   return await this.service.update(id, model);
  // }

  // @Get('/get/:id')
  // async get(@Param('id') id: number) {
  //   return await this.service.findOne(id);
  // }

  // @Delete('/delete/:id')
  // async delete(@Param('id') id: number) {
  //   return await this.service.delete(id);
  // }

}
