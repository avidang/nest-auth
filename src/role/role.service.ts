import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./role.schema";
import { Model } from "mongoose";

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

	async create(role: Role): Promise<Role> {
		const createdRole = new this.roleModel(role);
		return createdRole.save();
	}

	async findAll(): Promise<Role[]> {
		return this.roleModel.find().exec();
	}

	async findOne(id: string): Promise<Role | null> {
		return this.roleModel.findById(id).exec();
	}

	async update(id: string, role: Role): Promise<Role | null> {
		return this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
	}

	async remove(id: string): Promise<Role | null> {
		return this.roleModel.findByIdAndDelete(id).exec();
	}

	async removeAll(): Promise<void> {
		await this.roleModel.deleteMany().exec();
	}

	async findByName(name: string): Promise<Role[]> {
		return this.roleModel.find({ name }).exec();
	}
}
