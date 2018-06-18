<?php
header("Access-Control-Allow-Origin: *");

if(isset($_GET["sym"])){

echo file_get_contents("http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=".$_GET['sym']);

}


if(isset($_GET["keyword"])){
    $result  = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='.$_GET["keyword"]);
    echo($result);
}

if(isset($_GET["favtable"])){
    $result  = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$_GET["favtable"].'&outputsize=compact&apikey=751C927HQCVHWWD0');
    echo($result);
}

if(isset($_GET["inputValue"])) {
    //$result = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' . $_GET["inputValue"]);
    //echo($result);
     

		//echo "First";
		//echo "Second";

     $jsonResponse = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$_GET["inputValue"].'&outputsize=full&apikey=751C927HQCVHWWD0');
     echo $jsonResponse;

     echo "+";
 $jsonResponseSMA = file_get_contents('https://www.alphavantage.co/query?function=SMA&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
     echo $jsonResponseSMA;

     echo "+";

     $jsonResponseEMA = file_get_contents('https://www.alphavantage.co/query?function=EMA&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
     echo $jsonResponseEMA;

          echo "+";
          
           $jsonResponseSTOCH = file_get_contents('https://www.alphavantage.co/query?function=STOCH&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0&slowkmatype=1&slowdmatype=1');
          echo $jsonResponseSTOCH;

          echo "+";

            $jsonResponseRSI = file_get_contents('https://www.alphavantage.co/query?function=RSI&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
          echo $jsonResponseRSI;
          

          echo "+";

            $jsonResponseADX = file_get_contents('https://www.alphavantage.co/query?function=ADX&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
           echo $jsonResponseADX;


          echo "+";

            $jsonResponseCCI = file_get_contents('https://www.alphavantage.co/query?function=CCI&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
           echo $jsonResponseCCI;


          echo "+";

            $jsonResponseBBANDS = file_get_contents('https://www.alphavantage.co/query?function=BBANDS&symbol='.$_GET["inputValue"].'&interval=daily&series_type=close&apikey=751C927HQCVHWWD0&nbdevup=3&nbdevdn=3&time_period=5');
           echo $jsonResponseBBANDS;

          echo "+";

            $jsonResponseMACD = file_get_contents('https://www.alphavantage.co/query?function=MACD&symbol='.$_GET["inputValue"].'&interval=daily&time_period=10&series_type=close&apikey=751C927HQCVHWWD0');
           echo $jsonResponseMACD;


}


if (isset($_GET['feedInput'])) {
    $myXMLData="https://seekingalpha.com/api/sa/combined/".$_GET['feedInput'].".xml";

            //echo $myXMLData;

            $xml = simplexml_load_file($myXMLData);
            if ($xml === false) {
                echo "Failed loading XML: ";
                foreach(libxml_get_errors() as $error) {
                    echo "<br>", $error->message;
                }
            } else {
                //print_r($xml);
            }
            //echo "Here Maaan :";
            //echo $xml["channel"]["title"];

            $tcount=0;

            $title=[];
            $link=[];
            $pub=[];
            $author=[];

            $a='sa:author_name';

            //$htmltext='<table class="News">';
            foreach ($xml->channel->item as $item) {
                //echo "String article pos man";
                $pos=strrpos($item->link, "article");

                if($pos>0){
                $tcount++;
                //echo "Title is:".$item->title;
                //echo "Link is:".$item->link;
                //echo "PubDate is:".$item->pubDate;

                array_push($title, $item->title);

                array_push($link, $item->link);

                foreach ($item->children("https://seekingalpha.com/api/1.0") as $child) {
                        if ($child->getName() === "author_name") {
                            array_push($author, $child);
                        }
                    }
                //array_push($author, $item->$a);


                $p=(string)($item->pubDate);

                array_push($pub, (string)(substr($p, 0,25)));

                }
                //$htmltext.='<tr><td>'



                
                

                if($tcount==5)
                    break;
                }
                
                //echo "Echoing array";
                //print_r($title);
                //print_r($link);
            
            $jtitle = json_encode($title);
            $jlink = json_encode($link);
            $pub1=json_encode($pub);
            $auth=json_encode($author);

            echo $jtitle."+".$jlink."+".$pub1."+".$auth;



}

?>