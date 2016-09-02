
function GoPage(objinput, objdiv, intPage) {
    intPage = parseInt(intPage);
    var pagesize = 32;
    var columnize = 4;
    var arrList = (document.getElementById(objinput).value + "$$").replace(";;$$", "").split(";;");
    var Pagecount = Math.ceil(arrList.length / pagesize);
    var strTable = "";

    strTable = strTable + "<table width=\"750\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:0 0 25px 0;\" >";
    strTable = strTable + "<tr>";
    for (var i = (intPage - 1) * pagesize; i < intPage * pagesize; i++) {
        if(i==arrList.length)
            break;

        var strLink = "./product.aspx?seriesID=" + arrList[i].split("##")[0];
        var strFig = document.getElementById("imgesrcforpager").value + arrList[i].split("##")[1];

        var strPrice = arrList[i].split("##")[2] ;
        var striName = arrList[i].split("##")[3] ;
         strTable = strTable + "	<td align=\"center\" valign=\"top\">";
         strTable = strTable + "		<table width=\"135\"  cellpadding=\"0\" cellspacing=\"0\"  style=\"margin-bottom:25px;\">";
         strTable = strTable + "		<tr>";
         strTable = strTable + "			<td width=\"25%\" align=\"center\" border=\"0\" ><a target=\"_blank\" href=\"" + strLink + "\"><img  src=\"" + strFig + "\" alt=\"\" width=\"180\" height=\"180\" border=\"0\"></a></td>";
         strTable = strTable + "		</tr>";
         strTable = strTable + "		<tr>";
         strTable = strTable + "			<td align=\"center\" style=\"padding:13px 0 ;\">";
         strTable = strTable + "			<a target=\"_blank\" href=\"" + strLink + "\" class=\"85\">";
         strTable = strTable + "                        <span class=\"link_02_sp\"  id=\"link_02_sp_gyy_135\">$</span><span class=\"link_03_sp\"  id=\"link_03_sp_gyy_135\">" + strPrice + "</span>";
         strTable = strTable + "			</a>";
         strTable = strTable + "			</td>";
         strTable = strTable + "		</tr>";
         strTable = strTable + "		<tr>";
         strTable = strTable + "			<td align=\"left\"><p class=\"13pxgy\" style=\"font-size:10pt; *margin:0 4px;margin:0 2px; \" ><a target=\"_blank\" href=\"" + strLink + "\" >" + striName + "</a></p></td>";
         strTable = strTable + "		</tr>";
         strTable = strTable + "		</table>";
         strTable = strTable + "	</td>";
         if( (i+1)%columnize == 0 )
         {
             strTable = strTable + "</tr>";
             strTable = strTable + "<tr>";
             strTable = strTable + "	<td colspan=\"5\" align=\"center\" background=\"./images/content/inpage/box_line.gif\"><img src=\"./images/content/inpage/box_line.gif\" width=\"2\" height=\"1\"></td>";
             strTable = strTable + "</tr>";
             strTable = strTable + "</table>";
             strTable = strTable + "<table width=\"750\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:0 0 25px 0;\">";
             strTable = strTable + "<tr>";
         }
    }
    strTable = strTable + "</tr>";
    strTable = strTable + "</table>";
    if(arrList.length>0){
        strTable = strTable + "<table width=\"200\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"page_tbb\" style=\"margin:85px 0;\">";
        strTable = strTable + "<tr>";
        if(intPage>1){
            strTable = strTable + "<td align=\"left\"><a href=\"#\" onclick=\"GoPage('" + objinput + "','" + objdiv + "'," + 1 + ");\"><img border=0 src=\"images/content/inpage/btn_pageprev02.gif\" width=\"9\" height=\"9\"  style=\"-moz-opacity:0.5; filter:alpha(opacity=100);cursor:hand;\" onMouseOver=\"this.style.MozOpacity=0.5;this.filters.alpha.opacity=80\" onMouseOut=\"this.style.MozOpacity=1;this.filters.alpha.opacity=100\"></a></td>";
            strTable = strTable + "<td align=\"left\"><a href=\"#\" onclick=\"GoPage('" + objinput + "','" + objdiv + "'," + (intPage - 1) + ");\" class=\"page_a\"><img border=0 src=\"images/content/inpage/btn_pageprev01.gif\" width=\"5\" height=\"9\"  style=\"-moz-opacity:0.5; filter:alpha(opacity=100);cursor:hand;\" onMouseOver=\"this.style.MozOpacity=0.5;this.filters.alpha.opacity=80\" onMouseOut=\"this.style.MozOpacity=1;this.filters.alpha.opacity=100\"></a></td>";
        }

        strTable = strTable + "<td align=\"center\"><select onchange=\"javascript:GoPage('" + objinput + "','" + objdiv + "',this.value);location.href='#';\" >";
        for (var j = 1; j <= Pagecount; j++) {
            if (j == intPage) {
                strTable = strTable + "<option value=" + j + " selected=\"selected\">" + j + "</option>";
                //strTable = strTable + "<td align=\"center\"><a href=\"#\" class=\"greenpage_9px\">" + j + "</a></td>";
            }
            else {
                strTable = strTable + "<option value=" + j + ">" + j + "</option>";
                //strTable = strTable + "<td align=\"center\"><a href=\"#\" onclick=\"GoPage('" + objinput + "','" + objdiv + "'," + j + ");\" class=\"page_a\">" + j + "</a></td>";
            }
        }
        strTable = strTable + "</select></td>"

        if(intPage<Pagecount){
            strTable = strTable + "<td align=\"right\"><a href=\"#\" onclick=\"GoPage('" + objinput + "','" + objdiv + "'," + (intPage + 1) + ");\" class=\"page_a\"><img border=0 src=\"images/content/inpage/btn_pagenext01.gif\" width=\"5\" height=\"9\" style=\"-moz-opacity:0.5; filter:alpha(opacity=100);cursor:hand;\" onMouseOver=\"this.style.MozOpacity=0.5;this.filters.alpha.opacity=80\" onMouseOut=\"this.style.MozOpacity=1;this.filters.alpha.opacity=100\"></a></td>";
            strTable = strTable + "<td align=\"right\"><a href=\"#\" onclick=\"GoPage('" + objinput + "','" + objdiv + "'," + Pagecount + ");\" class=\"page_a\"><img border=0 src=\"images/content/inpage/btn_pagenext02.gif\" width=\"9\" height=\"9\" style=\"-moz-opacity:0.5; filter:alpha(opacity=100);cursor:hand;\" onMouseOver=\"this.style.MozOpacity=0.5;this.filters.alpha.opacity=80\" onMouseOut=\"this.style.MozOpacity=1;this.filters.alpha.opacity=100\"></a></td>";
        }
        strTable = strTable + "</tr>";
        strTable = strTable + "</table>";
    }
    document.getElementById(objdiv).innerHTML = strTable;
}