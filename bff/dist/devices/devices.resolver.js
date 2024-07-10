"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const devices_service_1 = require("./devices.service");
const devices_model_1 = require("./devices.model");
const devices_input_1 = require("./devices.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DevicesResolver = class DevicesResolver {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    async devices(context) {
        console.log('DevicesResolver: devices called', { context });
        const token = context.req.headers.authorization.split(' ')[1];
        return this.devicesService.findAll(token);
    }
    async device(id, context) {
        console.log('DevicesResolver: device called', { id, context });
        const token = context.req.headers.authorization.split(' ')[1];
        return this.devicesService.findOne(id, token);
    }
    async createDevice(input, context) {
        console.log('DevicesResolver: createDevice called', { input, context });
        const token = context.req.headers.authorization.split(' ')[1];
        return this.devicesService.create(input, token);
    }
    async removeDevice(id, context) {
        console.log('DevicesResolver: removeDevice called', { id, context });
        const token = context.req.headers.authorization.split(' ')[1];
        await this.devicesService.remove(id, token);
        return true;
    }
};
exports.DevicesResolver = DevicesResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [devices_model_1.Device]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevicesResolver.prototype, "devices", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => devices_model_1.Device),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DevicesResolver.prototype, "device", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => devices_model_1.Device),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [devices_input_1.CreateDeviceInput, Object]),
    __metadata("design:returntype", Promise)
], DevicesResolver.prototype, "createDevice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DevicesResolver.prototype, "removeDevice", null);
exports.DevicesResolver = DevicesResolver = __decorate([
    (0, graphql_1.Resolver)(() => devices_model_1.Device),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesResolver);
//# sourceMappingURL=devices.resolver.js.map