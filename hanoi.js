const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 10;
const GAP = 10;
var RATIO = 0.3;
N=8;
 

function layer(n,i)
{
  let x = i*INDENT;
  let y = (n-i -1)* THICKNESS;
  let width = 2*(n-i-1)*INDENT + TOPWIDTH;
  let height = THICKNESS;
  let ele = document.createElement("div");
  ele.className = "layer";
  ele.style.left = x +'px';
  ele.style.top = y + 'px';
  ele.style.width = width + 'px';
  ele.style.height = (height - GAP) + 'px';
  ele.id = "layer" + i;
  ele.innerHTML = disk(width, height, i);
  ele.style.backgroundColor = 'transparent';
  document.body.appendChild(ele);
}

function tower(n)
{
   for (let i=0; i < n; i++)
     layer(n, i);
 
   for (let i=0; i < n; i++)
   {
       let disk = document.getElementById('layer' + i);
       Drag.init(disk);
   }
}

function move(i,x,y)
{
   function move(i, x, y) {
    // 检查传入的参数是否有效
    if (!Number.isInteger(i) || i < 1) {
        console.error("Invalid element number:", i);
        return; // 返回，避免继续执行
    }

    let ele = document.getElementById("layer" + i);
    // 检查元素是否存在
    if (!ele) {
        console.error("Element with ID 'layer" + i + "' not found.");
        return; // 返回，避免继续执行
    }

    // 检查传入的位置参数是否为数字
    if (typeof x !== 'number' || typeof y !== 'number') {
        console.error("Invalid position coordinates:", x, y);
        return; // 返回，避免继续执行
    }

    // 移动元素
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
}

}

function disk(w, h, i)
{
    
    let h1 = w*RATIO;
    //let color = colors[i]; 
    let color = 'rgb(' + Math.floor(Math.random()*256) + ","
                       + Math.floor(Math.random()*256) + ","
                + Math.floor(Math.random()*256) + ")";
    let s ='<div style="margin-top:' + h1 + 'px;width:' + w + 'px;height:' + h + 'px;'
+'background-color:' + color + '"></div>'
+'<div style="margin:-' + h1/2 + 'px 0px -'+ (h1 + h) + 'px 0px;width:' + w + 'px;height:' + h1 + 'px;'
+'background-color:' + color + ';border-radius:' + (w/2) + 'px/' + h1/2 + 'px"></div>'
+'<div style="width:' + (w-2) + 'px;height:' + h1  + 'px;'
+'background-image:radial-gradient(#101010,#305020,15%,yellow,' + color + ');'
+'border-radius:' + (w/2-1) + 'px/' + h1/2 + 'px;'
+'border:1px red solid;"></div>';
  return s;
}
function moveDisk(i)
{
    let disk = document.getElementById('layer' + i);
    disk.style.animation = 'diskmove 2s 1';
}
tower(N);
//moveDisk(2);
//setTimeout('moveDisk(4)', 2000);

var alldiv = document.querySelectorAll('div');
for (let j = 0; j < alldiv.length; j++)
   alldiv[j].classList.add('cls1');


var My=
{
    println:function(x){document.writeln(x +'<br>');},
    $:function(x){return document.getElementById(x);}
};
let instructions=[];
function move(n,source,destin,temp)
{
 if(n===1)
    instructions.push([source,destin]);
  else
    {
       move(n-1,source,temp,destin);
       instructions.push([source,destin]);
       move(n-1,temp,destin,source);
    }
}

move(N,0,1,2);
for(let p of instructions)
     My.println(p[0]+'-->'+p[1]);

let numDisks=[N,0,0];
let stack=[];
stack[0]=[];for(let j=0;j<N;j++)stack[0].push(j);
stack[1]=[];
stack[2]=[];

function moveDisk(k)
{
   let p=instructions[k];
   console.log(p);
   if (p===null)return;
   let s=p[0];
   let d=p[1];
   let topid=stack[s].pop();
   
    let disk=My.$('layer'+topid);
   let x0=disk.style.left;
   let y0=disk.style.top;
   
   let x1=((screen.width-TOPWIDTH)/2.5*d)+'px';
   let y1=(N*THICKNESS)+'px';
   let q=stack[d];
   if(q.length>0)
   {
     let topid1=q[q.length-1];
     let disk1=My.$('layer'+topid1);
     x1=disk1.style.left;
     y1=disk1.style.top;
     y1=(parseInt(y1.substring(0,y1.length-2))
             -THICKNESS)+'px';
   }
   

   q.push(topid);
   
   let kftext="@keyframes diskmoveK{0%{left:X;top:Y)\n30%{left:U;top:V;}}";
   My.$('dynamic').innerHTML=kftext.replace(/K/,k).replace(/X/,x0).replace(/Y/,y0).replace(/U/,x1).replace(/V/,y1);
   disk.style.animation="diskmove"+k+"1s 1";
   disk.style.left=x1;
   disk.style.top=y1;}
 
moveDisk(0);
for (let i = 1; i < instructions.length; i++) {
  setTimeout(function() {
    moveDisk(i);
  }, i * 1010);
}