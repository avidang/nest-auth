import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserByProvider } from "src/user/users.types";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.schema";
import { Role } from "src/role/role.schema";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		@InjectModel(Role.name) private roleModel: Model<Role>,
	) {}

	// User methods
	async create(user: UserByProvider): Promise<UserDocument> {
		const createdUser = new this.userModel({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			providers: { [user.provider.name]: user.provider.data },
		});
		return createdUser.save();
	}

	async getOrCreate(newUser: UserByProvider): Promise<UserDocument> {
		return this.findOneByEmail(newUser.email).then((user) => {
			if (!user) return this.create(newUser);

			user.providers = {
				...user.providers,
				[newUser.provider.name]: newUser.provider.data,
			};
			return user.save();
		});
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().populate("roles").exec();
	}

	async findOne(id: string): Promise<UserDocument | null> {
		return this.userModel.findById(id).populate("roles").exec();
	}

	async findOneByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec();
	}

	async update(id: string, user: UpdateUserDto): Promise<UserDocument | null> {
		return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
	}

	async remove(id: string): Promise<UserDocument | null> {
		return this.userModel.findByIdAndDelete(id).exec();
	}

	async removeAll(): Promise<void> {
		await this.userModel.deleteMany().exec();
	}

	async findByName(name: string): Promise<UserDocument[]> {
		return this.userModel.find({ name }).exec();
	}

	async findOneByProvider<P extends keyof UserDocument["providers"]>(
		name: P,
		id: string,
	): Promise<UserDocument | null> {
		return this.userModel.findOne({ [`providers.${name}.id`]: id }).exec();
	}

	// Role methods
	async assignRole(
		userId: string,
		roleId: string,
	): Promise<UserDocument | null> {
		const user = await this.userModel.findById(userId).exec();
		if (!user) throw new Error("User not found");

		const role = await this.roleModel.findById(roleId).exec();
		if (!role) throw new Error("Role not found");

		user.roles.push(role);
		return user.save();
	}

	async getRoles(userId: string): Promise<Role[]> {
		const user = await this.userModel.findById(userId).populate("roles").exec();
		if (!user) throw new Error("User not found");

		return user.roles;
	}
}
