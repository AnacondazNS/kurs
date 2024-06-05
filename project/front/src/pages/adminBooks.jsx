import { AdminHOC } from "../components/AdminHoc";
import { AdminBooks } from "../modules/admin/book";

export const AdminBooksPage = () => AdminHOC(AdminBooks)