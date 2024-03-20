<?php
$arrFiles = array();
$dirPath = "./services/faq";
    
// Method 2: Using glob()
echo "--------------------------------<br>";
echo "Method 2: Using glob() <br>";
echo "--------------------------------<br>";
$files = glob($dirPath . "/*");
foreach ($files as $file) {
    if (is_file($file)) {
        echo basename($file) . "<br>";
    }
}

?>