"use strict";
let review = document.getElementById("review");
let feedback = document.getElementsByClassName("feedback");
let scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var selectedScore = 10;
// Hàm render danh sách điểm
function renderScores() {
    let scoreElement = document.getElementById("scoreList");
    let scoreHtmls = scoreList.map((score) => {
        return `
            <div id="scoreInput" class="crile-1 ${selectedScore === score ? "btn-selected" : ""}" onclick="getScore(${score})">${score}</div>
        `;
    });
    scoreElement.innerHTML = scoreHtmls.join("");
}
renderScores();
function getScore(scoreNumber) {
    selectedScore = scoreNumber;
    renderScores();
}
// let user: IFeedback[] = [
//   {
//     id: 1,
//     name: "hay lam",
//     score: 10,
//   },
// ];
// localStorage.setItem("user", JSON.stringify(user));
let user = JSON.parse(localStorage.getItem("user") || "[]");
function gui() {
    const idfeedback = {
        id: Math.floor(Math.random() * 100000),
        name: review.value,
        score: selectedScore,
    };
    user.push(idfeedback);
    localStorage.setItem("user", JSON.stringify(user));
}
class Feedback {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}
const allFeedback = document.getElementById("allFeedback");
class main {
    render() {
        allFeedback.innerHTML += ``;
        user.map((item) => {
            allFeedback.innerHTML += `
        <tr>
            <td>${item.id}</td>
          <td>${item.score}</td>
          <td>${item.name}</td>
          <td>
          <a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="edit(${item.id})"
            ><i class="material-icons">&#xE254;</i></a
          >
          <a
            href="#"
            class="delete"
            title="Delete"
            onclick="deleteBtn(${item.id})"
            data-toggle="tooltip"
            ><i class="material-icons"
            >&#xE872;</i></a
          >
        </td>
        </tr>
        `;
        });
    }
    deleteUser(inputId) {
        if (!confirm("Bạn có chắc muốn xóa review này")) {
            return;
        }
        const updatedUser = user.filter((item) => item.id !== inputId);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    changeStudent(inputId) {
        if (!confirm("Bạn có chắc muốn thay đổi thông tin review này?")) {
            return;
        }
        const index = user.findIndex((user) => user.id === inputId);
        if (index === -1) {
            console.log("Không tìm thấy feedback có id là", inputId);
            return;
        }
        const newName = prompt("Nhập lại review mới", user[index].name);
        if (newName !== null && newName !== "") {
            user[index].name = newName;
        }
        const newScoreString = prompt("Nhập lại điểm mới", user[index].score.toString());
        if (newScoreString !== null && newScoreString !== "") {
            const newScore = parseInt(newScoreString);
            if (!isNaN(newScore)) {
                user[index].score = newScore;
            }
            else {
                console.log("Lỗi: Điểm không hợp lệ. Vui lòng nhập lại.");
                return;
            }
        }
        const newIdString = prompt("Nhập id mới", user[index].id.toString());
        if (newIdString !== null && newIdString !== "") {
            const newId = parseInt(newIdString);
            if (!isNaN(newId)) {
                if (user.some((user) => user.id === newId)) {
                    console.log("Lỗi: Id đã tồn tại. Vui lòng nhập lại.");
                }
                else {
                    user[index].id = newId;
                    console.log("Thay đổi thông tin review thành công!");
                }
            }
            else {
                console.log("Lỗi: Id không hợp lệ. Vui lòng nhập lại.");
            }
        }
        localStorage.setItem("user", JSON.stringify(user));
    }
}
let a = new main();
a.render();
function deleteBtn(item) {
    a.deleteUser(item);
}
function edit(item) {
    a.changeStudent(item);
    a.render();
}
