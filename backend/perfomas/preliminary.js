module.exports = ({
  program,
  noOfMember,
  supervisorName,
  date,
  rollno,
  name,
  email,
  contact,
  pref1,
  tool,
  language,
  skill,
}) => {
  return ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preliminary Proposal</title>
    <style>
    * {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
}
.hdr {
  height: 112px;
}
.imgdiv {
  height: 112px;
  width: 23%;
  float: left;
}
.imgdiv img {
  margin-top: 13px;
  margin-left: 38%;
}
.hdrdiv2 {
  width: 63%;
  height: 100px;
  float: left;
  padding-top: 12px;
}
.hdrdiv2 h3 {
  text-align: center;
}
.hdrdiv2 h2 {
  text-align: center;
  color: #00a65a;
}
.heading {
  padding: 15px 0;
}
.heading h3 {
  text-align: center;
}
.heading h4 {
  text-align: center;
}
table {
  width: 88%;
  margin-left: 6%;
  border-spacing: 0ch;
}
.t1 table tr td {
  padding: 5px 2px;
}
.grayc {
  background-color: lightgray;
}
.smhd {
  font-size: 11px;
}
.studhd {
  text-align: center;
  padding: 8px 0px;
}
.t2 table tr td {
  padding: 5px 2px;
  height: 22px;
}
.t3 table tr td {
  padding: 5px 2px;
  height: 22px;
}
.t3 table tr th {
  max-width: 0px;
}
.space {
  height: 50px;
}
.left-div {
  width: 50%;
}
.pad {
  padding: 2px 110px;
}
.marg {
  padding-top: 30px;
}
.td-width {
  min-width: 120px;
}
.hd1 {
  padding-top: 9px;
}

.blackc {
  background-color: black;
  color: white;
}
.tab23 table tr th {
  padding: 6px 2px;
}
.srwidth {
  width: 25px;
  height: 30px;
}
.signdiv {
  width: 165px;
  height: 130px;
  border: 1.5px solid black;
  margin-left: 35%;
}
.signdiv p {
  text-align: center;
}
.padd1 {
  padding: 5px 2px;
}
ul {
  margin-left: 100px;
  margin-top: 20px;
}
ul li {
  padding: 3px 2px;
}

.mmargin {
  margin-left: 15px;
}

.tmd2 table tr th {
  padding: 6px 2px;
}
.tmd2 table tr td {
  max-width: 110px;
  padding: 2px;
}
.mwid {
  width: 110px;
  min-width: 140px;
}
.mrl {
  margin-left: 25%;
}
.sidebord {
  border-right: 1px solid black;
}
.nestt {
  text-align: center;
}
.nestbord {
  border-bottom: 1px solid black;
}
.wid12 {
  min-width: 150px;
}
.ul2 {
  margin-left: 0px;
}
.padmem {
  padding: 7px 20px;
}
</style>
</head>
<body>
    <div class="main" style="border: 1px solid black;">
        <div class="hdr">
            <div class="imgdiv">
                <img src="logo.jpg" height="76%"  alt="logo">
            </div>
            <div class="hdrdiv2">
                <h2>Gujrat Institute of Management Sciences</h2>
                    <h2>PMAS-Arid Agriculture University Rawalpindi/</h2>
                    <h3 class="hd1">Preliminary Proposal Form</h3>
            </div>
        </div>
        <div class="content">          
            <div class="t1">            
                <table border="1px solid black" spellspace="0">
                    <tr>
                        <td class="blackc"><b>Program/Semester </b></td>
                        <td class="td-width">${program}</td>
                        <td class="blackc"><b>No.of Members </b></td>
                        <td class="td-width">${noOfMember}</td>
                    </tr>
                    
                    <tr>
                        <td class="blackc"><b>SUPERVISOR NAME </b></td>
                        <td class="td-width">${supervisorName}</td>
                        <td class="blackc"><b>Date </b></td>
                        <td class="td-width">${date}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h4 class="studhd"></h4>
            </div>
            <div class="tab23">
                <table border="1px solid black">
                    <tr>
                        <th></th>
                        <th>Reg.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>${rollno}</td>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${contact}</td>
                        
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>${rollno}</td>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${contact}</td>
                        
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>${rollno}</td>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${contact}</td>
                        
                    </tr>
                    
                </table>
            </div>
            <div>
                <h3 class="studhd">(Provide 3 project ideas starting from first priority):</h3>
            </div>
            <div class="t3">
                <table border="1px solid black">
                    <tr>
                        <td colspan="4"><b>1st preference:</b></td>
                    </tr>
                    <tr>
                        <td colspan="4"><b>2nd preference:</b></td>
                    </tr>
                    <tr>
                        <td colspan="4"><b>3rd preference:</b></td>
                    </tr>
                    
                </table>
            </div>
            <div>
                <h3 class="studhd">(Mention here elective courses taken in degree):</h3>
            </div>
            <div class="t3">
                <table border="1px solid black">
                    <tr>
                        <td colspan="4">${pref1}</td>
                    </tr>
                    <tr>
                        <td colspan="4">${pref1}</td>
                    </tr>
                    <tr>
                        <td colspan="4">${pref1}</td>
                    </tr>
                    
                </table>
            </div>
            <div>
                <h3 class="studhd">(Mention your programming languages, tools you are skilled in:</h3>
            </div>
            <div class="t3">
                <table border="1px solid black">
                    <tr>
                        <td colspan="4">${tool}</td>
                    </tr>
                    <tr>
                        <td colspan="4">${language}</td>
                    </tr>
                    <tr>
                        <td colspan="4">${skill}</td>
                    </tr>
                    
                </table>
            </div>
            <div class="space">

            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <table border="1px solid black" spellspace="0">
                                <tr>
                                    <th colspan="3" class="blackc padd1">MEMBERS’ SIGNATURES</th>
                                </tr>
                                <tr>
                                    <td class="srwidth">1</td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr>
                                    <td class="srwidth">2</td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr>
                                    <td class="srwidth">3</td>
                                    <td colspan="2"></td>
                                </tr>
                            </table>
                        </td>
                         <td><div class="signdiv"><p>Supervisor’s Signature</p></div></td>   
                    </tr>
                    <tr >
                          
                    </tr>

                </table>
            </div>
            <div>
                <ul>
                    <li><h2>Note:</h2></li>
                    <li class="mmargin"><h3>Skills, objectives or idea you choose shoul be purposeful</h3></li>
                    <li class="mmargin"><h3>Skills/project being covered in the projects should be objective driven</h3></li>
                    <li class="mmargin"><h3>Confirm that the projects are rigors and truly assess your abilities</h3></li>
                </ul>
            </div>
            <div class="space">
                
            </div>
        </div>
        
    </div>
</body>
</html>`;
};
