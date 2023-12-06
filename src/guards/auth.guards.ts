import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UsersRepository
    ) { }

    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        const token = authorization?.replace("Bearer ", "");
        try {
            const email = this.authService.checkToken(token);
          
            const user = this.userRepository.findUserByEmail(email);
            if (!user) throw new UnauthorizedException("Unauthorized user");

            request.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException("Unauthorized user");
        }
    }
}