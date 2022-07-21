import db from "../db/db";
import { ref, set, onValue, query } from "firebase/database";

class WillhabenService {
  getChildren(children) {
    return onValue(query(ref(db, children)));
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
