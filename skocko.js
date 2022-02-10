var color;
var color_list = ["red", "green", "pink", "yellow", "white", "purple"];
var comb_list = [];
var pick_list = [];
var field = 1;
var total_score = [];
var score = 0;

for (let i = 0; i < 4; i++ ) {
		let number = Math.floor(Math.random() * 6);
		comb_list.push(color_list[number]);
}


function pick_color(sign) {
	color = document.getElementById(sign).innerText;
	document.getElementById("pick" + field.toString()).style.border = "2px solid blue";
}

var num = 1;
var points = 100;
var lost_points = 0;
var correct = 0;
var wrong_place = 0;
var correct_list = [];
var wrong_list = [];
var check = 0;
var row = 1;
var invalid_click = false;

function change_color() {
	if (color === undefined) {
		alert("Izaberite boju!");
	}else{
		if (invalid_click === false) {
			let s_num = num.toString();
			if(field < 28) field++;
			
			document.getElementById("pick" + s_num).style.background = color;
			document.getElementById("pick" + field.toString()).style.border = "2px solid blue";
			
			pick_list.push(color);

			score_check();

		}else{
			alert("Igra je gotova! Osvojili ste: " + score.toString() + " bodova");
		}
	}

}

function score_check(){
	if (num % 4 === 0) {
		correct = 0;
		wrong_place = 0;

		if (JSON.stringify(comb_list) === JSON.stringify(pick_list)) {
			total_score.push(points - lost_points);
			score = 0;
			for (let i = 0; i < total_score.length; i++) {
				score += total_score[i];
			}
			
			if(confirm("Cestitamo, osvojili ste: " + score.toString() + " bodova! Zelite li novu igru?")){
			  
			  	comb_list = [];

			  	for (let i = 0; i < 4; i++ ) {
					let number = Math.floor(Math.random() * 6);
					comb_list.push(color_list[number]);
				}

				num = 0;
				field = 1;
				color = undefined;

				for(let i = 1; i < 29; i++){
					document.getElementById("pick" + i.toString()).style.background = "transparent";
					document.getElementById("pick" + i.toString()).style.border = "2px solid white";
				}

				points = 100;
				lost_points = -10;
				row = 0;

				for(let i = 1; i < 8; i++){
					document.getElementById("correct" + i.toString()).innerText = "";
					document.getElementById("wrong" + i.toString()).innerText = "";
				}
				
			}else{
				invalid_click = true;
			}
		}else{
			if (num === 28) {
			  alert("Izgubili ste!");
			  location.href= "skocko_main_page.html";
			}
			for(let i = 0; i < 4; i++){
					if(comb_list[i] === pick_list[i]){
						correct++;
						correct_list.push(i);
					}else{
						wrong_list.push(i);
					}
			}

			for(let i = 0; i < wrong_list.length; i++){
				for(let j = 0; j < wrong_list.length; j++){
					if (comb_list[wrong_list[i]] === pick_list[wrong_list[j]]) {
						wrong_place++;
						pick_list[wrong_list[j]] = "null";
						break;
					}
				}
			}

			if (field < 28) {
				document.getElementById("correct" + row.toString()).innerText = correct.toString();
				document.getElementById("wrong" + row.toString()).innerText = wrong_place.toString();
			}
		}
		pick_list = [];
		num++;
		lost_points += 10;
		correct_list = [];
		wrong_list = [];
		row++;
	}else{
		num++;
	}

}


var show_rules_validation = true;
var show_info_validation = true;

function hide_text(){
	$("#game_rules").hide();
	$("#project_info").hide();
}

function show_rules(){
	if (show_rules_validation === true) {
		$("#game_rules").show();
		$("#title_row").hide();
		show_rules_validation = false;
	}else{
		$("#game_rules").hide();
		if(show_info_validation === true) $("#title_row").show();
		show_rules_validation = true;
	}
	
}

function show_info(){
	if (show_info_validation === true) {
		$("#project_info").show();
		$("#title_row").hide();
		show_info_validation = false;
	}else{
		$("#project_info").hide();
		if(show_rules_validation === true) $("#title_row").show();
		show_info_validation = true;
	}
	
}