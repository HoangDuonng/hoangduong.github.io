<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT `device`, `topic`,`value`,`created_at` FROM `data` where (device like '%".$s."%' or  topic like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['device']=$rows["device"];
        $usertemp['topic']=$rows["topic"];
        $usertemp['value']=$rows["value"];
        $usertemp['created_at']=$rows["created_at"];
       
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>

