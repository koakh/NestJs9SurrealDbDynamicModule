import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { Uuid } from 'surrealdb';
import { AuthenticateDto, ConnectDto, CreateDto, SigninDto, SignupDto, UpdateDto, UseDto } from './dto';
import { SignUpInResponseDto } from './dto/signup-in-response.dto';
import { SurrealDbService } from './surrealdb.service';

@Controller('surrealdb')
export class SurrealDbController {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }

  @Post('/connect')
  connect(@Body() { url }: ConnectDto) {
    return this.surrealDbService.connect(url);
  }

  @Post('/close')
  close() {
    return this.surrealDbService.close();
  }

  @Post('/use')
  use(@Body() { ns, db }: UseDto) {
    return this.surrealDbService.use(ns, db);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<SignUpInResponseDto> {
    let mode = {};
    // https://surrealdb.com/docs/sdk/javascript/methods/signup#example-usage
    if (signupDto.access) {
      // with Record Access: if passed 
      mode = { access: 'user' };
    }
    // With Scopes
    else {
      mode = { scope: 'user' };
    }

    return this.surrealDbService.signup({
      namespace: signupDto.namespace,
      database: signupDto.database,
      scope: signupDto.scope,
      ...mode,
    });
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto): Promise<SignUpInResponseDto> {
    return this.surrealDbService.signin({
      namespace: signinDto.namespace,
      database: signinDto.database,
      scope: signinDto.scope,
      username: signinDto.username,
      password: signinDto.password,
    });
  }

  @Post('/invalidate')
  invalidate(): any {
    return this.surrealDbService.invalidate();
  }

  @Post('/authenticate')
  authenticate(@Body() { token }: AuthenticateDto) {
    return this.surrealDbService.authenticate(token);
  }

  @Post('/let')
  let(@Body() { key, val }) {
    return this.surrealDbService.let(key, val);
  }

  @Post('/query')
  async query(@Body() { sql, vars }) {
    return this.surrealDbService.query(sql, vars);
  }

  @Get('/select/:thing')
  select(@Param('thing') thing: string) {
    return this.surrealDbService.select(thing);
  }

  @Post('/create/:thing')
  create(@Param('thing') thing: string, @Body() createDto: CreateDto) {
    return this.surrealDbService.create(thing, createDto);
  }

  @Put('/update/:thing')
  update(@Param('thing') thing: string, @Body() updateDto: UpdateDto) {
    return this.surrealDbService.update(thing, updateDto);
  }

  @Delete('/delete/:thing')
  delete(@Param('thing') thing: string) {
    return this.surrealDbService.delete(thing);
  }

  @Post('/ping')
  ping() {
    return this.surrealDbService.ping();
  }

  @Post('/info')
  info() {
    return this.surrealDbService.info();
  }

  @Post('/live')
  live(@Param('table') table: string) {
    return this.surrealDbService.live(table);
  }

  @Post('/kill')
  kill(@Param('query') queryUuid: Uuid | readonly Uuid[]) {
    return this.surrealDbService.kill(queryUuid);
  }
}
