import { AdminHOC } from "../components/AdminHoc";
import { AdminGenres } from "../modules/admin/genre";

export const AdminGenresPage = () => AdminHOC(AdminGenres)