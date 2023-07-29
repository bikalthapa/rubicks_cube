
// Declaring Variables //
var i,j;
// This variable will hold all the names of group colour present inside a rubicks
var col_list = ["red","white","blue","orange","yellow","green","pink","cyan","skyblue"];
var col_index = 0;
var id;
var temp = [];
// This col_position variable is for storing all the colours of a cube //
var col_position = [
		[["red","white","blue"],["orange","yellow","green"],["pink","cyan","skyblue"]], 
		[["skyblue","cyan","pink"],["green","yellow","orange"],["blue","white","red"]],
		[["skyblue","yellow","red"],["cyan","pink","orange"],["skyblue","green","white"]],
		[["skyblue","yellow","red"],["red","white","blue"],["white","green","cyan"]],
		[["white","red","blue"],["skyblue","yellow","red"],["green","orange","blue"]],
		[["skyblue","red","white"],["yellow","white","green"],["red","white","blue"]]];

// This sw_indx variable determines the first index of top,right,buttom and left of current face 
// Suppose sw_indx [1][0] represents the first index of top part of the face 1. Note face starts from zero
var sw_indx = [[4,3,2,1],[0,2,5,4],[0,3,5,1],[0,4,5,2],[0,1,5,3],[2,3,4,1]];
// Generating cubical box using loop
document.write("<div class='main_container'>");
for(var k = 0; k<6; k++){
	if(k==1){
		document.write("<div class='cont_group'>");
		document.write("<div class='container cont_"+k+"'>");
	}else{
	document.write("<div class='container cont_"+k+"'>");
	}
	for (i = 0; i <3; i++) {
		document.write("<div class='row'>");
		for (j = 0; j <3; j++) {
			id = "id"+k+"_"+i+"_"+j;
			// col_position[k][i][j] = col_list[col_index];
			document.write("<div class='cube_elem "+col_position[k][i][j]+"' id='"+id+"'></div>");
			if(col_index<col_list.length-1){
				col_index++;
			}else{
				col_index = 0;
			}
		}
		document.write("</div>");
	}
	if(k==4){
		document.write("</div>");
		document.write("</div>");
	}else{
		document.write("</div>");
	}
}
document.write("</div>");




// This function will return the edge and the corner colour of a given face side
function edge_corner_color(face){
	var top = [[],[]];
	var right = [[],[]];
	var buttom = [[],[]];
	var left = [[],[]];
	for(i=0; i<4; i++){
		for(j=0; j<3; j++){
			id = "id"+sw_indx[face][i]+"_"+i+"_"+j;
			if(i==0){// This condition is for storing the value of top edge part of face //
				if(face==2 || face==5){
					top[1][j] =  "id"+sw_indx[face][i]+"_"+2+"_"+j;
					top[0][j] = col_position [sw_indx[face][i]] [2][j];
				}else if(face==4 || face==0){
					top[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+(2-j);
					top[0][j] = col_position [sw_indx[face][i]] [0][2-j];
				}else if(face==1){
					top[1][j] =  "id"+sw_indx[face][i]+"_"+j+"_"+0;
					top[0][j] = col_position [sw_indx[face][i]] [j][0];
				}else if(face==3){
					top[1][j] =  "id"+sw_indx[face][i]+"_"+(2-j)+"_"+2;
					top[0][j] = col_position [sw_indx[face][i]] [2-j][2];
				};
			}else if(i==1){// This condition is for storing the value of right edge part of face ///
				if(face==0){
					right[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+(2-j);
					right[0][j] = col_position [sw_indx[face][i]] [0][2-j];
				}else if(face==1 || face==2 || face==3 || face==4){
					right[1][j] =  "id"+sw_indx[face][i]+"_"+j+"_"+0;
					right[0][j] = col_position [sw_indx[face][i]] [j][0];
				}else if(face==5){
					right[1][j] =  "id"+sw_indx[face][i]+"_"+2+"_"+j;
					right[0][j] = col_position [sw_indx[face][i]] [2][j];
				}
			}else if(i==2){// This condition is for storing the  value of button edge part of face//
				if(face==0 || face==2){
					buttom[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+j;
					buttom[0][j] = col_position [sw_indx[face][i]] [0][j];
				}else if(face==1){
					buttom[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+j;
					buttom[0][j] = col_position [sw_indx[face][i]] [2-j][0];
				}else if(face==3){
					buttom[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+j;
					buttom[0][j] = col_position [sw_indx[face][i]] [j][2];
				}else if(face==4 || face==5){
					buttom[1][j] =  "id"+sw_indx[face][i]+"_"+2+"_"+(2-j);
					buttom[0][j] = col_position [sw_indx[face][i]] [2][2-j];
				}
			}else{// This condition is for storing the value of left edge part of face //
				if(face==0){
					left[1][j] =  "id"+sw_indx[face][i]+"_"+0+"_"+j;
					left[0][j] = col_position [sw_indx[face][i]] [0][j];
				}else if(face==1 || face==2 || face==3 || face==4){
					left[1][j] =  "id"+sw_indx[face][i]+"_"+j+"_"+2;
					left[0][j] = col_position [sw_indx[face][i]] [j][2];
				}else if(face==5){
					left[1][j] =  "id"+sw_indx[face][i]+"_"+2+"_"+(2-j);
					left[0][j] = col_position [sw_indx[face][i]] [2][2-j];
				}
			}
		}
	}
// document.getElementById("test").innerHTML = "<br>"+top+"<br>"+right+"<br>" +buttom+"<br>" + left+"<br>";
	return([top,right,buttom,left]);
}

// This function will swap the colour of front touching edge part //
function side(direction , edg_face){
	var elem = edge_corner_color(edg_face);

	// This elem_color variable will give the colour of top,right,buttom and left //
	// here first index represent side and second index 0 represent that  it contain colour 
	// if second index is 1 it means that we are getting an id of side not colours //
	var elem_color = [ elem[0][0] , elem[1][0] , elem[2][0] , elem[3][0] ];
	var elem_id = [ elem[0][1] , elem[1][1] , elem[2][1] , elem[3][1] ];
	var edg_temp = [];

	/*
	This first if block will store the value of top edge part of given face 
	-> We have to start loop from top to (right,buttom left) part if it is in anti clockwise direction
	-> We have to start loop from left to (buttom, right , top) edge it is in clockwise direction   
	conclusion : looping start is opposite to the  direction //
	*/
	if(direction=='anti'){// This block will store the value of all the top edge part if direction is anti clock wise //
		edg_temp[0] = elem_color[0][0];
		edg_temp[1] = elem_color[0][1];
		edg_temp[2] = elem_color[0][2];
	}else{// This block will store the value of all left edge part if direction is not anti clock wise //
		edg_temp[0] = col_position[sw_indx[edg_face][3]][0][2];
		edg_temp[1] = col_position[sw_indx[edg_face][3]][1][2];
		edg_temp[2] = col_position[sw_indx[edg_face][3]][2][2];
	}

	function swap_edge(new_elem_color,new_col_position, direction){// This function will swap the edge of a cube
		if(direction=="anti"){// This block will be executed if direction is anti clockwise //
			document.getElementById(elem_id[i][j]).classList.add(elem_color[new_elem_color[0]][new_elem_color[1]]);
			elem_color[i][j] = elem_color[new_elem_color[0]][new_elem_color[1]];
			col_position[sw_indx[edg_face][i]][new_col_position[0]][new_col_position[1]] = elem_color[i][j];
		}else{// This block will be executed if direction is anti clockwise //
			document.getElementById(elem_id[3-i][j]).classList.add(col_position[sw_indx[edg_face][2-i]][new_elem_color[0]][new_elem_color[1]]);
			col_position [sw_indx[edg_face][3-i]] [new_col_position[0]] [new_col_position[1]] = col_position[sw_indx[edg_face][2-i]] [new_elem_color[0]] [new_elem_color[1]];
		}
	}



	// This function will swap the edge part of face 0 including clockwise and anti-clockwise direction
	function face_0_side_swap(i,j,direction){
		if(direction=="anti"){// This block will swap edge of face 0 in anti-clockwise direction 
			if(i==0){
				document.getElementById(elem_id[0][j]).classList.add(col_position[sw_indx[edg_face][1]][0][2-j]);
				col_position[sw_indx[edg_face][i]][0][2-j] = col_position[sw_indx[edg_face][1]][0][2-j];
			}else if(i==1){
				document.getElementById(elem_id[1][j]).classList.add(col_position[sw_indx[edg_face][2]][0][2-j]);
				col_position[sw_indx[edg_face][i]][0][2-j] = col_position[sw_indx[edg_face][2]][0][2-j];
			}else if(i==2){
				document.getElementById(elem_id[2][j]).classList.add(col_position[sw_indx[edg_face][3]][0][j]);
				col_position[sw_indx[edg_face][i]][0][j] = col_position[sw_indx[edg_face][3]][0][j];
			}else{
				document.getElementById(elem_id[3][j]).classList.add(edg_temp[2-j]);
				col_position[sw_indx[edg_face][i]][0][j] = edg_temp[2-j];
			}
		}else{// This block will swap edge of face 0 in clockwise direction 

		}
	}

		// This function can be used to swap edge part of face 2 both clockwise and anti clockwise
	function face_2_side_swap(i,j,direction){
		if(direction=="anti"){
		// This block of statement will swap face 2 edge part in anti_clock wise direction 
			if(i==0){
				swap_edge([1,j] , [2,j] , direction);// adding new values to the top of current face//
			}else if(i==1){
				swap_edge([2,2-j] , [j,0] , direction);// Adding new values to the right of current face//
			}else if(i==2){
				swap_edge([3,j] , [0,j] , direction);// Adding new values to the buttom of current face//
			}else if(i==3){// This block will add the new values from the temp for left part of current face //
				document.getElementById(elem_id[i][j]).classList.add(edg_temp[2-j]);
				elem_color[2][j] = edg_temp[2-j];
				col_position[sw_indx[edg_face][i]][j][2] = elem_color[2][j];
			}
		}else{
			// This block of statement will swap face 2 edge part in clock-wise direction
			if(i==0){
				document.getElementById(elem_id[3-i][j]).classList.add(col_position[sw_indx[edg_face][2]][0][j]);
			}else if(i==1){
				document.getElementById(elem_id[3-i][j]).classList.add(col_position[sw_indx[edg_face][1]][2-j][0]);
			}
		}
	}

	for(i=0; i<4; i++){// This will execute 4 times since there are four edge in single face
		for(j=0; j<3; j++){// This will execute 3 times since there is 3 elements in each edge

		// This statements will remove the colour of edge element for inserting new element //
		document.getElementById(elem_id[i][j]).classList.remove(elem_color[i][j]);

		// Checking which face is choosen and swapping the values according to the face //
			if(edg_face==0){
				face_0_side_swap(i,j,direction);
			}else if(edg_face==2){
				face_2_side_swap(i,j,direction);
			}
		}
	}
}


// This function will rotate the face part of a cube
function front(direction,id_cont){
	var face = id_cont;
	id_cont+='_';
	// Storing the values to temporary variable 
	temp[0] = col_position[face][0][0];
	temp[1] = col_position[face][0][1];
	temp[2] = col_position[face][0][2];
	temp[4] = col_position[face][2][0];
	// Storing different values for different direction //
	if(direction=="anti"){
		side(direction , face);
		temp[3] = col_position[face][1][0];
	}else{
		side(direction , face);
		temp[3] = col_position[face][1][2];
	}
			// A function for clockwise rotation of a face side//
			function clock(){
					if(j==2){					
						// Displaying new swapped colour to the cube_elements 
						document.getElementById(id).classList.add(temp[i]);
						// Storing new swapped values to variables//
						col_position[face][i][j] = temp[i];
					}else if((i==2)&&(j==1)){

					}else{
						// Displaying new swapped values //
						document.getElementById(id).classList.add(col_position[face][2-j][i]);					
						// Storing new values to variable //
						col_position[face][i][j] = col_position[face][2-j][i];
					}
			}

			// A function for anti Clockwise rotation for face side//
			function anti_clock(){
					if(j==0){
						document.getElementById(id).classList.add(temp[2-i]);// Displaying Colors
						col_position[face][i][j] = temp[2-i];// Storing colors
					}else if((i==2)&&j==1){
						document.getElementById(id).classList.add(temp[3]);// Displaying Colors
						col_position[face][i][j] = temp[3];// Storing colors
					}else if((i==2)&&(j==2)){
						document.getElementById(id).classList.add(temp[4]);// Displaying Colors
						col_position[face][i][j] = temp[4];// Storing colors
					}else{
						document.getElementById(id).classList.add(col_position[face][j][2-i]);// Displaying colors
						col_position[face][i][j] = col_position[face][j][2-i];// Storing colors
					}
			}
// Swapping the values //
	for(i=0; i<3; i++){
		for(j=0; j<3; j++){
			id = "id"+id_cont+i+"_"+j;
			// Not swapping the values if it contains center element
			if(!((i==1)&&(j==1))){
				document.getElementById(id).classList.remove(col_position[face][i][j]);
				if((i==2)&&(j==1)){
					// Displaying new swapped colour to the cube_elements
					document.getElementById(id).classList.add(temp[3]);
					// Storing new swapped values to variables//
					col_position[face][i][j] = temp[3];
				}else{
					if(direction=="anti"){
						anti_clock();
					}else if(direction=="clock"){
						clock();
					}
				}
			}
		}
	}

}

// Draft
