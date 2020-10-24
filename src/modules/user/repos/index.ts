
import models from '@/infra/database/mongodb/models'

import { UserRepo } from "./impl/UserRepo";

const userRepo = new UserRepo(models);

export { userRepo }
