<?php

    require_once("dbconfig.php");
	$username=$_POST["username"];
	$password=sha1($_POST["password"]);
    $sql="SELECT  `username`,fullname,diachi,permission,avartar FROM users where username='".$username."' and password='".$password."'";

   $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
       
        $usertemp['username']=$rows["username"];
        $usertemp['fullname']=$rows["fullname"];
		$usertemp['diachi']=$rows["diachi"];
		$usertemp['permission']=$rows["permission"];
		$usertemp['avartar']=$rows["avartar"];
        array_push($mang,$usertemp);  
    }
	if(count($mang)==0){
		$jsondata['sucess'] =false;
		$jsondata['items'] =$mang;
	}else{
		$jsondata['sucess'] =true;
		$jsondata['items'] =$mang;	
	}
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>