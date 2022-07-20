import db from "../db/db";
import { ref, set, get, child } from "firebase/database";

class WillhabenService {
  getChildren(children) {
    return get(child(db, children));
  }
  create(result) {
    const date = new Date(Date.now());
    return set(
      ref(
        db,
        `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getHours()}`
      ),
      result
    );
  }
}

export default new WillhabenService();
