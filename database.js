const bcrypt = require("bcrypt");

let users = {
  users: [
    {
      id: 1,
      username: "sutthisarn",
      password: "123456",
      email: "sutthisarn@gmail.com",
    },
    {
      id: 2,
      username: "test",
      password: "$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO",
      email: "test@gmail.com",
    },
  ],
};

let transactions = {
  transaction: [
    {
      username: "user1",
      tst_id: 1,
      scientific_name: "Cinnamomum camphora",
      characteristic:
        "ลักษณะของลำต้นคือเป็นต้นไม้ที่มีลำต้นขนาดใหญ่ ลักษณะเป็นทรงพุ่มกว้างและทึบ สูง 10 – 15 เมตร อาจสูงได้ถึง 30 เมตร ลำต้นมีขนาดเส้นผ่านศูนย์กลางถึง 1.5 เมตร เปลือกต้นเป็นสีน้ำตาล ผิวหยาบ ส่วนเปลือกกิ่งเป็นสีเขียวหรือเป็นสีน้ำตาลอ่อน ลำต้นและกิ่งเรียบไม่มีขน ส่วนเนื้อไม้เป็นสีน้ำตาลปนแดง เมื่อนำมากลั่นแล้วจะได้ “การบูร” ทุกส่วนมีกลิ่นหอม โดยเฉพาะที่ส่วนที่ของรากและโคนต้น เกล็ดชั้นนอกเล็กกว่าเกล็ดชั้นใน",
      foundsource: "พื้นที่ราบ อากาศร้อน",
      date: "26/4/2021",
      imgURL:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indexlivingmall.com%2F170113774.html&psig=AOvVaw2tyZORr_bmH8FukgKHrG5V&ust=1619710164642000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCGkuugofACFQAAAAAdAAAAABAD",
    },
    {
      username: "user2",
      tst_id: 2,
      scientific_name: "Cinnamomum camphora",
      characteristic:
        "ลักษณะของลำต้นคือเป็นต้นไม้ที่มีลำต้นขนาดใหญ่ ลักษณะเป็นทรงพุ่มกว้างและทึบ สูง 10 – 15 เมตร อาจสูงได้ถึง 30 เมตร ลำต้นมีขนาดเส้นผ่านศูนย์กลางถึง 1.5 เมตร เปลือกต้นเป็นสีน้ำตาล ผิวหยาบ ส่วนเปลือกกิ่งเป็นสีเขียวหรือเป็นสีน้ำตาลอ่อน ลำต้นและกิ่งเรียบไม่มีขน ส่วนเนื้อไม้เป็นสีน้ำตาลปนแดง เมื่อนำมากลั่นแล้วจะได้ “การบูร” ทุกส่วนมีกลิ่นหอม โดยเฉพาะที่ส่วนที่ของรากและโคนต้น เกล็ดชั้นนอกเล็กกว่าเกล็ดชั้นใน",
      foundsource: "พื้นที่ราบ อากาศร้อน",
      date: "26/4/2021",
      imgURL:
        "https://www.thairath.co.th/media/dFQROr7oWzulq5Fa4VZ3930FMsSxuX83HRitAsZrILKgM0Zl0pW17fRYxjqgKGpieX5.jpg",
    },
    {
      username: "user3",
      tst_id: 3,
      scientific_name: "Cinnamomum camphora",
      characteristic:
        "ลักษณะของลำต้นคือเป็นต้นไม้ที่มีลำต้นขนาดใหญ่ ลักษณะเป็นทรงพุ่มกว้างและทึบ สูง 10 – 15 เมตร อาจสูงได้ถึง 30 เมตร ลำต้นมีขนาดเส้นผ่านศูนย์กลางถึง 1.5 เมตร เปลือกต้นเป็นสีน้ำตาล ผิวหยาบ ส่วนเปลือกกิ่งเป็นสีเขียวหรือเป็นสีน้ำตาลอ่อน ลำต้นและกิ่งเรียบไม่มีขน ส่วนเนื้อไม้เป็นสีน้ำตาลปนแดง เมื่อนำมากลั่นแล้วจะได้ “การบูร” ทุกส่วนมีกลิ่นหอม โดยเฉพาะที่ส่วนที่ของรากและโคนต้น เกล็ดชั้นนอกเล็กกว่าเกล็ดชั้นใน",
      foundsource: "พื้นที่ราบ อากาศร้อน",
      date: "26/4/2021",
      imgURL:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indexlivingmall.com%2F170113774.html&psig=AOvVaw2tyZORr_bmH8FukgKHrG5V&ust=1619710164642000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCGkuugofACFQAAAAAdAAAAABAD",
    },
  ],
};

const SECRET = "your_jwt_secret";
const NOT_FOUND = -1;

exports.users = users;
exports.SECRET = SECRET;
exports.NOT_FOUND = NOT_FOUND;

exports.setUsers = function (_users) {
  users = _users;
};

// === validate username/password ===
exports.isValidUser = async (username, password) => {
  const index = users.users.findIndex((item) => item.username === username);
  return await bcrypt.compare(password, users.users[index].password);
};

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
  return users.users.findIndex((item) => item.username === username);
};

exports.findTransactions = async () => {
  return transactions.transaction;
};

exports.findTransactionsByID = async (username) => {
  let temp = transactions.transaction.filter(
    (index) => index.username == username
  );
  return temp;
};

exports.addTransaction = async (req, username) => {
  const { scientific_name, characteristic, foundsource, date, imgURL} = req;
  let lastTranID = await this.findTransactionID();
  let newData = {};
  newData.username = username;
  newData.tst_id = lastTranID;
  newData.scientific_name = scientific_name;
  newData.characteristic = characteristic;
  newData.foundsource = foundsource;
  newData.date = date;
  newData.imgURL = imgURL;
  transactions = { transaction: [...transactions.transaction, newData] };
  return transactions.transaction
};

exports.findUserID = async (users_id) => {
  return;
};

exports.findTransactionID = async () => {
  let lastIndex = transactions.transaction.length;
  return transactions.transaction[lastIndex - 1].tst_id + 1;
};

exports.deleteTransaction = async (transactionID) => {
  let found = await transactions.transaction.find(
    (find) => find.tst_id == transactionID
  );
  if (!found) {
    return false;
  }
  transactions.transaction = await transactions.transaction.filter(
    (find) => find.tst_id != transactionID
  );
  return transactions.transaction;
};

exports.editTransaction = async (req) => {
  const {
    scientific_name,
    characteristic,
    foundsource,
    date,
    tst_id,
    imgURL,
  } = req;
  let found = await transactions.transaction.find(
    (find) => find.tst_id == tst_id
  );
  if (!found) {
    return false;
  }
  found.scientific_name = scientific_name;
  found.characteristic = characteristic;
  found.date = date;
  found.foundsource = foundsource;
  found.imgURL = imgURL;
  return found;
};
