import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Uuid } from 'surrealdb';
import { ConnectDto, DataDto, InsertRelation, InsertRelationDto, SigninDto, SignupDto, UseDto } from './dto';
import { SurrealDbService } from './surrealdb.service';

const callbackSubscribeLive =
  // The callback function takes two arguments: the 'action' and 'result' properties
  (action, result) => {
    // action can be: 'CREATE', 'UPDATE', 'DELETE' or 'CLOSE'
    if (action === 'CLOSE') return;
    Logger.log(`subscribeLive action: ${JSON.stringify(action, undefined, 2)}, result: ${JSON.stringify(result, undefined, 2)}`, SurrealDbController.name);
  };

@Controller('surrealdb')
export class SurrealDbController {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }

  @Post('/connect')
  async connect(@Body() { url }: ConnectDto) {
    return await this.surrealDbService.connect(url);
  }

  @Post('/close')
  async close() {
    return await this.surrealDbService.close();
  }

  @Post('/ping')
  async ping() {
    return await this.surrealDbService.ping();
  }

  @Post('/use')
  async use(@Body() { namespace: ns, database: db }: UseDto) {
    return await this.surrealDbService.use(ns, db);
  }

  @Post('/info')
  async info() {
    return await this.surrealDbService.info();
  }

  // https://surrealdb.com/docs/sdk/javascript/methods/signup#signup
  // https://surrealdb.com/docs/sdk/javascript/core/handling-authentication
  // https://surrealdb.com/docs/sdk/javascript/methods/signup#example-usage
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    // access supported from SurrealDB 2.x onwards
    let mode = signupDto.access ? { access: signupDto.access } : { access: signupDto.scope };
    const payload = { ...signupDto, ...mode, }
    // Logger.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`, SurrealDbController.name);
    return await this.surrealDbService.signup(payload);
  }

  // https://surrealdb.com/docs/sdk/javascript/methods/signin#example-usage    
  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    let mode = signinDto.access ? { access: signinDto.access } : { access: signinDto.scope };
    const payload = { ...signinDto, ...mode, }
    return await this.surrealDbService.signin(payload);
  }

  @Post('/invalidate')
  async invalidate() {
    return await this.surrealDbService.invalidate();
  }

  @Post('/authenticate')
  async authenticate(@Body() { token }) {
    return await this.surrealDbService.authenticate(token);
  }

  @Post('/let')
  async let(@Body() { variable, value }) {
    return await this.surrealDbService.let(variable, value);
  }

  @Post('/unset')
  async unset(@Body() { variable }) {
    return await this.surrealDbService.unset(variable);
  }

  @Post('/live/:table')
  async live(@Param('table') table: string) {
    const callback =
      // The callback function takes two arguments: the 'action' and 'result' properties
      (action, result) => {
        // action can be: 'CREATE', 'UPDATE', 'DELETE' or 'CLOSE'
        if (action === 'CLOSE') return;
        Logger.log(`live action: ${JSON.stringify(action, undefined, 2)}, result: ${JSON.stringify(result, undefined, 2)}`, SurrealDbController.name);
      };
    return await this.surrealDbService.live(table, callback);
  }

  @Post('/subscribe-live/:queryUuid')
  async subscribeLive(@Param('queryUuid') queryUuid: Uuid) {
    return await this.surrealDbService.subscribeLive(queryUuid, callbackSubscribeLive);
  }

  @Post('/unsubscribe-live/:queryUuid')
  async unSubscribeLive(@Param('queryUuid') queryUuid: Uuid) {
    return await this.surrealDbService.unSubscribeLive(queryUuid, callbackSubscribeLive);
  }

  @Post('/kill/:queryUuid')
  async kill(@Param('queryUuid') queryUuid: Uuid | readonly Uuid[]) {
    return await this.surrealDbService.kill(queryUuid);
  }

  @Post('/query')
  async query(@Body() { query, bindings }) {
    return await this.surrealDbService.query(query, bindings);
  }

  @Post('/query-raw')
  async queryRaw(@Body() { query, bindings }) {
    return await this.surrealDbService.queryRaw(query, bindings);
  }

  @Get('/select/:thing')
  async select(@Param('thing') thing: string) {
    return await this.surrealDbService.select(thing);
  }

  @Post('/create/:thing')
  async create(@Param('thing') thing: string, @Body() createDto: DataDto) {
    return await this.surrealDbService.create(thing, createDto);
  }

  @Post('/insert/:thing')
  async insert(@Param('thing') thing: string, @Body() insertDto: DataDto) {
    return await this.surrealDbService.insert(thing, insertDto);
  }

  @Post('/insert-relation/:thing')
  async insertRelation(@Param('thing') thing: string, @Body() rawPayload: any) {
    // Logger.log(`Raw Payload: ${JSON.stringify(rawPayload)}`, SurrealDbController.name);
    // normalize payload to always be an array, this wai it works with arrays and plain objects
    const payloadArray = Array.isArray(rawPayload) ? rawPayload : [rawPayload];
    const transformedData = payloadArray.map(item =>
      plainToInstance(InsertRelation, item, {
        enableImplicitConversion: true,
        excludeExtraneousValues: false,
      })
    );
    // used InsertRelationDto here, not in controller
    const insertRelationDto = new InsertRelationDto();
    insertRelationDto.data = transformedData;
    // Logger.log(`Transformed DTO: ${JSON.stringify(insertRelationDto)}`, SurrealDbController.name);
    return await this.surrealDbService.insertRelation(thing, insertRelationDto.data);
  }

  // @Put('/update/:thing')
  // async update(@Param('thing') thing: string, @Body() updateDto: UpdateDto) {
  //   return await this.surrealDbService.update(thing, updateDto);
  // }

  // TODO: merge

  // TODO: patch

  @Delete('/delete/:thing')
  async delete(@Param('thing') thing: string) {
    return await this.surrealDbService.delete(thing);
  }

  // TODO: version

  // TODO: relate

  // TODO: rpc

  // TODO: export
}
