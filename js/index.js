(game = () => {
    document.getElementById("reset_button").addEventListener("click", window.location.reload.bind(window.location));//* دکمه ریست کننده بازی
    var dots = document.getElementsByClassName("center_dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", change_color);
    }
})();
var index = 0;
var count1;
var game_counter = []; //*  با حلقه تعداد بازی های انجام شده را بدست می آوریمgameCounter لیستی که ما داخلش به ازای هر بازی یک 1 واردش میکنیم و در متد 
function change_color() {
    count1 = 0;
    let time_of_game_played = gameCounter();
    if (time_of_game_played % 2 === 0) { //*باقیمانده تقسیم تعداد دفعات بازی به 2 حاصل یا 0میشه یا 1 پس میفهمیم که نوبت بازی فرد است یا زوج اگه زوج باشه نوبت بازیکن اوله اگر حاصل فرد بشه نوبت بازیکن دوم میشود
        if (this.className === 'center_dot actived') {//*در صورتی که یک باکس ما قبلا فعال شده باشد بازیکن بعدی اجازه ندارد ان را تغییر دهد
            alert('you can not change it');
        } else {
            this.style.backgroundColor = 'rgb(231, 76, 60)';//red
            this.className = "center_dot actived";
            document.getElementById("player_turn_dot").style.backgroundColor = 'rgb(52, 152, 219)';//blue   player turn
            count1++;
            game_counter[index] = count1;
            index++;
            game_win_processor();
        }
    } else {
        if (this.className === 'center_dot actived') {
            alert('you can not change it')
        } else {
            this.style.backgroundColor = 'rgb(52, 152, 219)';//blue
            this.className = "center_dot actived";
            document.getElementById("player_turn_dot").style.backgroundColor = 'rgb(231, 76, 60)' //red palyer turn
            count1++;
            game_counter[index] = count1;
            index++;
            game_win_processor();
        }
    }
}
//* متد محاسبه تعداد دفعاتی که بازی انجام شده
let gameCounter = () => {
    let time_of_game_played = 0;

    for (let j = 0; j < game_counter.length; j++) {
        time_of_game_played += game_counter[j];
    }
    return time_of_game_played;
}
var time_of_win = 0; //* استفاده میشود تا تعداد دفعات پیروزی را در خود ذخیره کند و به متد نمایش پیروزی ارسال شود تا فقط یک بار پیروزی رخ دهد و مانع از چند بار اعلام پیروزی شود game_win_processor این متغیر برای متد 
//* متد محاسبه کننده پیروزی در بازی
let game_win_processor = () => {
    let dot = document.getElementsByClassName("center_dot");
    let indext = 0;
    let same_color_list = [];
    for (let i = 0; i < 5; i++) {
        same_color_list[i] = []; //* ایجاد ارایه دو بعدی برای ریختن 25 کلاس باکس ها در این ارایه و درست کردن ماتریس برای راحتی کار در پیدا کردن نقاط داخل ماتریس
        for (let j = 0; j < 5; j++) {
            let backgroun_color = window.getComputedStyle(dot[indext]);
            same_color_list[i][j] = backgroun_color.getPropertyValue('background-color');
            indext++;
        }
    }

    //* تضخیص پیروزی : به صورت افقی
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (j + 2 < 5) {
                if (same_color_list[i][j] === 'rgb(231, 76, 60)' & same_color_list[i][j + 1] === 'rgb(231, 76, 60)' & same_color_list[i][j + 2] === 'rgb(231, 76, 60)') {
                    finish_game(time_of_win, 'red');
                    time_of_win++;
                    draw_line(i, j, 'red', "row");
                }
                if (same_color_list[i][j] === 'rgb(52, 152, 219)' & same_color_list[i][j + 1] === 'rgb(52, 152, 219)' & same_color_list[i][j + 2] === 'rgb(52, 152, 219)') {
                    finish_game(time_of_win, 'blue');
                    time_of_win++;
                    draw_line(i, j, 'blue', "row");
                }
            } else { break; }
        }
    }
    //* تشخیص پیروزی : به صورت عمودی
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (j + 2 < 5) {
                if (same_color_list[j][i] === 'rgb(231, 76, 60)' & same_color_list[j + 1][i] === 'rgb(231, 76, 60)' & same_color_list[j + 2][i] === 'rgb(231, 76, 60)') {
                    finish_game(time_of_win, 'red');
                    time_of_win++;
                    draw_line(i, j, 'red', "column");
                }
                else if (same_color_list[j][i] === 'rgb(52, 152, 219)' & same_color_list[j + 1][i] === 'rgb(52, 152, 219)' & same_color_list[j + 2][i] === 'rgb(52, 152, 219)') {
                    finish_game(time_of_win, 'blue');
                    time_of_win++;
                    draw_line(i, j, 'blue', "column");
                }
                else { continue; }
            } else { break; }
        }
    }
    //* تشخیص پیروزی : مورب از چپ بالا به راست پایین
    for (let j = 2; j < 5; j++) {
        for (let i = 0; i < 3; i++) {
            if (same_color_list[i][j] === 'rgb(231, 76, 60)' && same_color_list[i + 1][j - 1] === 'rgb(231, 76, 60)' && same_color_list[i + 2][j - 2] === 'rgb(231, 76, 60)') {
                finish_game(time_of_win, 'red');
                time_of_win++;

                draw_line(i, j, 'red', "oblique1");
            }
            else if (same_color_list[i][j] === 'rgb(52, 152, 219)' && same_color_list[i + 1][j - 1] === 'rgb(52, 152, 219)' && same_color_list[i + 2][j - 2] === 'rgb(52, 152, 219)') {
                finish_game(time_of_win, 'blue');
                time_of_win++;
                draw_line(i, j, 'blue', "oblique1");
            } else { continue; }
        }
    }
    //* تشخیص پیروزی: مورب از راست بالا به چپ پایین 
    for (let j = 2; j < 5; j++) {

        for (let i = 4; i >= 2; i--) {

            if (same_color_list[i][j] === 'rgb(231, 76, 60)' && same_color_list[i - 1][j - 1] === 'rgb(231, 76, 60)' && same_color_list[i - 2][j - 2] === 'rgb(231, 76, 60)') {
                finish_game(time_of_win, 'red');
                time_of_win++;
                draw_line(i, j, 'red', "oblique2");
            }
            else if (same_color_list[i][j] === 'rgb(52, 152, 219)' && same_color_list[i - 1][j - 1] === 'rgb(52, 152, 219)' && same_color_list[i - 2][j - 2] === 'rgb(52, 152, 219)') {
                finish_game(time_of_win, 'blue');
                time_of_win++;
                draw_line(i, j, 'blue', "oblique2");
            } else { continue; }
        }
    }
    //* حالت پنج حرکت یا برابر بودن بازی، متد پایین فراخوانی میشود تا یک سطر یا ستون بصورت رندم خالی شود
    random_reset_column_or_row();
}
//* متد خالی کننده ردیف یا ستون به صورت رندوم
function random_reset_column_or_row() {
    let dot = document.getElementsByClassName("center_dot");
    let indext = 0;
    let same_color_list = [];
    for (let i = 0; i < 5; i++) {
        same_color_list[i] = [];//* ایجاد ارایه دو بعدی برای ریختن 25 کلاس باکس ها در این ارایه و درست کردن ماتریس برای راحتی کار در پیدا کردن نقاط داخل ماتریس
        for (let j = 0; j < 5; j++) {
            let backgroun_color = window.getComputedStyle(dot[indext]);
            same_color_list[i][j] = backgroun_color.getPropertyValue('background-color');
            indext++;
        }
    }
    let time_of_game_played = gameCounter();
    if (time_of_game_played % 5 == 0 && time_of_win == 0) {//*نتیجه مساوی یا تعداد بازی مضربی از 5 است
        //*استفاده میکنیم تا با تاخیر یک ثانیه یک ردیف یا ستون رو خالی کنهsetTimeout از 
        setTimeout(function () {
            let row_or_column = Math.floor((Math.random() * 2));
            if (row_or_column == 1) {//*  برابر 1 بشه ما یک ردیف رو خالی میکنیمrow_or_columnاگر
                let i = Math.floor((Math.random() * 4) + 1);//*شماره ردیفی که باید خالی بشه
                for (let m = 0; m < 5; m++) {
                    for (let j = 0; j < 5; j++) {
                        if (same_color_list[i][j] === 'rgb(231, 76, 60)' || same_color_list[i][j] === 'rgb(52, 152, 219)') {
                            dot[(i * 5) + j].className = 'center_dot';
                            dot[(i * 5) + j].style.backgroundColor = 'rgb(141, 141, 141)';
                        } else { continue; }
                    }
                }
            } else {//*  برابر 0 بشه ما یک ستون رو خالی میکنیمrow_or_columnاگر
                let i = Math.floor((Math.random() * 4) + 1);//*شماره ستونی که باید خالی بشه
                for (let m = 0; m < 5; m++) {
                    for (let j = 0; j < 5; j++) {
                        if (same_color_list[j][i] === 'rgb(231, 76, 60)' || same_color_list[j][i] === 'rgb(52, 152, 219)') {
                            dot[i + (j * 5)].className = 'center_dot';
                            dot[i + (j * 5)].style.backgroundColor = 'rgb(141, 141, 141)';
                        } else { continue; }
                    }
                }
            }
        }, 600);
    }

}
//* متد نمایش نتیجه بازی و رست کردن بازی همراه با تایمر
let finish_game = (time_of_win, winner) => {
    if (time_of_win === 0) {
        let timeleft = 10;
        let gameTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(gameTimer);
                location.reload();
            } else {
                debugger;
                document.getElementById("timer").innerHTML = `the game will be<br>reset in : ` + timeleft;
                document.getElementById("winner").innerHTML = "red";
                if (winner === "red") { document.getElementById("winner").style.color = "red"; }
                else {
                    document.getElementById("winner").innerHTML = "blue";
                    document.getElementById("winner").style.color = "blue";
                }
                document.getElementById("text").style.opacity = 1;
            }
            if (timeleft <= 5) document.getElementById("timer").style.color = "#e74c3c";
            timeleft--;
        }, 1000);
    }
}
//*این متد روی سه دکمه بردنه خطی با رنگ همان بازیکن رسم میکند
function draw_line(i, j, winnerColor, mood) {
    if (mood === "row") {
        //*ردیفی
        document.getElementById("canvas").style.display = "block";
        let dot = document.getElementsByClassName("center_dot");
        //* get first btn position
        let offset1 = $(`#${dot[(i * 5) + j].id}`).offset();
        var left1 = offset1.left;
        let btnTop = offset1.top;
        //* get third btn position
        let offset3 = $(`#${dot[(i * 5) + j + 2].id}`).offset();
        var left3 = offset3.left + 15;
        //* get doz box position
        let offsetD = $("#doz_box").offset();
        let doz_box_top = offsetD.top;
        var lastDist = btnTop - doz_box_top + 15;
        draw(1);
    } else if (mood === "column") {
        //*عمودی
        document.getElementById("canvas").style.display = "block";
        let dot = document.getElementsByClassName("center_dot");
        //* get first btn position
        let offset1 = $(`#${dot[i + (j * 5)].id}`).offset();
        var left1 = offset1.left + 8;
        let top1 = offset1.top;
        //* get third btn position
        let offset3 = $(`#${dot[10 + i + (j * 5)].id}`).offset();
        var left3 = offset3.left + 8;
        let top3 = offset3.top;
        //* get doz box position
        let offsetD = $("#doz_box").offset();
        let doz_box_top = offsetD.top;
        var lastDist1 = top1 - doz_box_top + 15;
        var lastDist2 = top3 - doz_box_top + 15;
        draw(2);
    } else if (mood === "oblique1") {

        //*مورب نوع اول
        document.getElementById("canvas").style.display = "block";
        let dot = document.getElementsByClassName("center_dot");
        //* get first btn position
        let offset1 = $(`#${dot[j + (i * 5)].id}`).offset();
        var left1 = offset1.left + 8;
        let top1 = offset1.top;
        //* get third btn position
        let offset3 = $(`#${dot[(j - 2) + ((i + 2) * 5)].id}`).offset();
        var left3 = offset3.left + 8;
        let top3 = offset3.top;
        //* get doz box position
        let offsetD = $("#doz_box").offset();
        let doz_box_top = offsetD.top;
        var lastDist1 = top1 - doz_box_top + 15;
        var lastDist2 = top3 - doz_box_top + 15;
        const ctx = document.getElementById("canvas").getContext("2d");
        draw(3);
    } else if (mood === "oblique2") {
        //*مورب نوع دوم
        document.getElementById("canvas").style.display = "block";
        let dot = document.getElementsByClassName("center_dot");
        //* get first btn position
        let offset1 = $(`#${dot[j + (i * 5)].id}`).offset();
        var left1 = offset1.left + 8;
        let top1 = offset1.top;
        //* get third btn position
        let offset3 = $(`#${dot[(j - 2) + ((i - 2) * 5)].id}`).offset();
        var left3 = offset3.left + 8;
        let top3 = offset3.top;
        //* get doz box position
        let offsetD = $("#doz_box").offset();
        let doz_box_top = offsetD.top;
        var lastDist1 = top1 - doz_box_top + 15;
        var lastDist2 = top3 - doz_box_top + 15;
        draw(4);
    }
    function draw(i) {
        if (i === 1) {
            const ctx = document.getElementById("canvas").getContext("2d");
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            ctx.strokeStyle = winnerColor;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(left1, lastDist);
            ctx.lineTo(left3, lastDist);
            ctx.stroke();
        } else {
            const ctx = document.getElementById("canvas").getContext("2d");
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            ctx.strokeStyle = winnerColor;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(left1, lastDist1);
            ctx.lineTo(left3, lastDist2);
            ctx.stroke();
        }
    }
}

