var myAccountAddress,contractInstance;
var network_From = 'srdx';
var network_To = 'srds';
var asset_Name = 'srdx';
var asset_To = 'srds';
var chainID = 51712;
var global = {
	tronUserAddress : '',
	tronUserAddressHex : '',
	loggedIn : false
}
var ethPrice = 0.00;
var bnbPrice = 0.00;
var eurxPrice = 0.00;
var goldxPrice = 0.00;
if(window.ethereum){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && window.ethereum.isMetaMask==true){
      var myweb3 = new Web3( window.ethereum);
   }else{
      const oldProvider =  window.ethereum;  // keep a reference to metamask provider
      var myweb3 = new Web3(oldProvider);
   }
   
   ethereum.on('accountsChanged', handleAccountsChanged);
   function handleAccountsChanged (accounts) {
     if (accounts.length === 0) {    
       // MetaMask is locked or the user has not connected any accounts
       console.log('Please connect to MetaMask.')
     } else if (accounts[0] !== myAccountAddress) {
         window.location.href = "";
     }
  }
}else{
    var myweb3 = new Web3( window.ethereum);
}

async function checkAccount() {
    if (window.ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    
            if (accounts == null || accounts.length == 0) {
                console.log("NO ACCOUNT CONNECTED");
            } else {
                if (myAccountAddress != accounts[0]) {
                    myAccountAddress = accounts[0];                    
                }
                const shortAddress = getUserAddress(myAccountAddress);
                $('#connectWallet,#connectWallet1').html(shortAddress);
                $('#connectWallet,#connectWallet1').attr("href", "https://etherscan.io/address/"+myAccountAddress).attr('target','_blank');
                $('#connectWallet1').hide();
                $('#btnNext').show();
            }
        
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile && window.ethereum.isMetaMask==true){
                     const accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
                     if (accounts_ == null || accounts_.length == 0) {
                        console.log("NO ACCOUNT CONNECTED");
                    } else {
                        if (myAccountAddress != accounts_[0]) {
                            myAccountAddress = accounts_[0];                    
                        }
                        const shortAddress = getUserAddress(myAccountAddress);
                        $('#connectWallet,#connectWallet1').html(shortAddress);
                        $('#connectWallet,#connectWallet1').attr("href", "https://etherscan.io/address/"+myAccountAddress).attr('target','_blank');
                        $('#connectWallet1').hide();
                        $('#btnNext').show();
                    }
        } 
    }
}
setTimeout(checkAccount, 500);
$('document').ready(function(){
    addNetowrk('SRDX');
});
//get short user address
function getUserAddress(userAddress){
    firstFive   = userAddress.substring(0 , 5); 
    lastFive    = userAddress.substr(userAddress.length - 5);
    return firstFive+'...'+lastFive;
}

function number_to_2decimals(str)
{
    str = str.toString();
    const decimalPointIndex = str.indexOf(".");
    if (decimalPointIndex === -1) return str + ".00";
    return (str+"00").substr(0, decimalPointIndex+3);
}
const delay = ms => new Promise(res => setTimeout(res, ms));
//connect to metamask wallet 
$("#connectWallet,#connectWallet1").click(async function(e){
    e.preventDefault();
    var accounts_;
    if(window.ethereum){
        window.ethereum.enable();
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && window.ethereum.isMetaMask==true){
                accounts_ = await window.ethereum.request({ method: 'eth_requestAccounts' });
                //alert(accounts_);
            
        }else{
            accounts_ = await ethereum.request({ method: 'eth_accounts' });
              console.log(accounts_);
        }
        //const accounts_ = await ethereum.request({ method: 'eth_accounts' });
        if(accounts_!=""){
            window.location.href = "";
        }
    }
});

//token from select 
$('#assetFrom li').click(async function(){
    var name = $(this).data('name');
    console.log(">>>@@@@>>> name >>>",name);
    if(name=="tsrdx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/srdx.png"> tSRDX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> tSRDS (Sardis Network)');
        $('.tokenCheck').hide();
        $('#tsrdxTokencheck').show();
        asset_Name = 'tsrdx';
        asset_To = 'tsrds';
        network_From = 'tsrdx';
        network_To = 'tsrds';
        addNetowrk('tSRDX');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('tSRDS');
        //$('#feeText').html('(Fee 10$ of tSRDS)');
        //$('#feeText').show();
        $('#reciveToken').html('');
    }
    if(name=="tsrds"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/srdx.png"> tSRDS (Sardis Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> tSRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#tsrdsTokencheck').show();
        asset_Name = 'tsrds';
        asset_To = 'tsrdx';
        network_From = 'tsrds';
        network_To = 'tsrdx';
        addNetowrk('tSRDS');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('tSRDX');
        //$('#feeText').html('(Fee 10$ of tSRDS)');
        //$('#feeText').show();
        $('#reciveToken').html('');
    }
    if(name=="srdx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDS (Sardis Network)');
        $('.tokenCheck').hide();
        $('#srdxTokencheck').show();
        asset_Name = 'srdx';
        asset_To = 'srds';
        network_From = 'srdx';
        network_To = 'srds';
        addNetowrk('SRDX');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDS');
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        eurxPrice = edata['euro-coin'].usd;
        goldxPrice = edata['pax-gold'].usd;
       // $('#feeText').html('(Fee 10$ of SRDS)');
        //$('#feeText').show();
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled',false);
        $('.tokenCheckTo').hide();
        $('#srdsTokenTocheck').show();
    }
    if(name=="srds"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/srdx.png"> SRDS (Sardis Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#srdsTokencheck').show();
        asset_Name = 'srds';
        asset_To = 'srdx';
        network_From = 'srds';
        network_To = 'srdx';
        addNetowrk('SRDS');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled','disabled');
        //$('#feeText').html('(Fee 10$ of SRDS)');
       // $('#feeText').show();
    }
    if(name=="eurx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/eurx.png"> EURX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#eurxTokencheck').show();
        asset_Name = 'eurx';
        asset_To = 'srdx';
        network_From = 'srdx';
        network_To = 'srdx';
        addNetowrk('SRDX');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled',true);
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        eurxPrice = edata['euro-coin'].usd;
        
        //console.log(eurxPrice);
        ///$('#feeText').html('(Fee 10$ of SRDS)');
       // $('#feeText').show();
    }
    if(name=="goldx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/goldx.png"> GOLDX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#goldxTokencheck').show();
        asset_Name = 'goldx';
        asset_To = 'srdx';
        network_From = 'srdx';
        network_To = 'srdx';
        addNetowrk('SRDX');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled',true);
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        goldxPrice = edata['pax-gold'].usd;
        //$('#feeText').html('(Fee 10$ of SRDS)');
       // $('#feeText').show();
    }
    if(name=="usdx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/usdx.png"> USDX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#usdxTokencheck').show();
        asset_Name = 'usdx';
        asset_To = 'srdx';
        network_From = 'srdx';
        network_To = 'srdx';
        addNetowrk('SRDX');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled',true);
        //$('#feeText').html('(Fee 10$ of SRDS)');
       // $('#feeText').show();
    }
    // if(name=="eth"){
    //     $('#assetFromUL').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Ethereum Network)');
    //     $('#assetToUl').html('<img class="icons" src="assets/img/eth-icon.svg"> ETHX (Sardis-x Network)');
    //     $('.tokenCheck').hide();
    //     $('#ethTokencheck').show();
    //     asset_Name = 'eth';
    //     asset_To = 'srdx';
    //     network_From = 'eth';
    //     network_To ='srdx';
    //     addNetowrk('ETH');
    //     $('#receiveTokenImg').attr('src','assets/img/eth-icon.svg');
    //     $('#reciveName').html('ETHX');
    //     $('#feeText').hide();
    // }
    // new srdx code 6-9-2022
    if(name=="eth"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#ethTokencheck').show();
        asset_Name = 'eth';
        asset_To = 'srdx';
        network_From = 'eth';
        network_To ='srdx';
        addNetowrk('ETH');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#feeText').hide();
        $('#reciveToken').html('');
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        ethPrice = edata.ethereum.usd;
        $('#assetToUl').attr('disabled','disabled');

    }
    if(name=="tsrdxeth"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Sardix-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/eth-icon.svg"> ETH (Ethereum Network)');
        $('.tokenCheck').hide();
        $('#dithTokencheck').show();
        asset_Name = 'tsrdxeth';
        asset_To = 'eth';
        network_From = 'tsrdx';
        network_To ='eth';
        addNetowrk('tSRDX');
        $('#receiveTokenImg').attr('src','assets/img/eth-icon.svg');
        $('#reciveName').html('ETH');
        $('#feeText').hide();
        $('#reciveToken').html('');
    }
    // new srdx code 6-9-2022
    // if(name=="bnb"){
    //     $('#assetFromUL').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Binance Network)');
    //     $('#assetToUl').html('<img class="icons" src="assets/img/bnb-logo.png"> BNBX (Sardis-x Network)');
    //     asset_Name = 'bnb';
    //     asset_To = 'srdx';
    //     network_From = 'bsc';
    //     network_To = 'srdx';
    //     $('.tokenCheck').hide();
    //     $('#bscTokencheck').show();
    //     $('#receiveTokenImg').attr('src','assets/img/bnb-logo.png');
    //     $('#reciveName').html('BNBX');
    //     $('#feeText').hide();
    //     addNetowrk('BNB');
    // }
    if(name=="bnb"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        asset_Name = 'bnb';
        asset_To = 'srdx';
        network_From = 'bsc';
        network_To = 'srdx';
        $('.tokenCheck').hide();
        $('#bscTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#feeText').hide();
        addNetowrk('BNB');
        $('#reciveToken').html('');
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        bnbPrice = edata.binancecoin.usd;
        $('#assetToUl').attr('disabled','disabled');
    }
    if(name=="dbnb"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/bnb-logo.png"> BNB (Binance Network)');
        asset_Name = 'dbnb';
        asset_To = 'bnb';
        network_From = 'tsrdx';
        network_To = 'bsc';
        $('.tokenCheck').hide();
        $('#dbscTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/bnb-logo.png');
        $('#reciveName').html('BNB');
        $('#feeText').hide();        
        addNetowrk('tSRDX');
        $('#reciveToken').html('');
    }
    if(name=="trx"){        
        $('#assetFromUL').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (TRON Network)');
        $('#assetTo li').addClass("disabled2");
        $('#assetToUl').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (Sardis-x Network)');
        asset_Name = 'trx';
        asset_To = 'tsrdx';
        network_From = 'trx';
        network_To = 'tsrdx';
        $('.tokenCheck').hide();
        $('#trxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tron-logo.png');
        $('#reciveName').html('TRX');
        $('#feeText').hide();
        addNetowrk('TRX');
        $('#reciveToken').html('');
    }
    if(name=="dtrx"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (Sardis-x Network)');
        $('#assetTo li').addClass("disabled2");
        $('#assetToUl').html('<img class="icons" src="assets/img/tron-logo.png"> TRX (TRON Network)');
        asset_Name = 'dtrx';
        asset_To = 'trx';
        network_From = 'tsrdx';
        network_To = 'trx';
        $('.tokenCheck').hide();
        $('#dtrxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tron-logo.png');
        $('#reciveName').html('TRX');
        $('#feeText').hide();
        addNetowrk('TRX');
        $('#reciveToken').html('');
    }
    if(name=="matic"){
        asset_Name = 'matic';
        asset_To = 'dmatic';
        network_From = 'polygon';
        network_To = 'tsrdx';
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Polygon Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#maticTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('MATIC');
        $('#feeText').hide();
        addNetowrk('POLYGON');
        $('#reciveToken').html('');
    }
    if(name=="dmatic"){
        asset_Name = 'dmatic';
        asset_To = 'matic';
        network_From = 'tsrdx';
        network_To = 'polygon';
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> MATIC (Polygon Network)');
        $('.tokenCheck').hide();
        $('#dmaticTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('MATIC');
        $('#feeText').hide();
        addNetowrk('tSRDX');
        $('#reciveToken').html('');
    }
    if(name=="ht"){
        asset_Name = 'ht';
        asset_To = 'tsrdx';
        network_From = 'heco';
        network_To = 'tsrdx';
        $('#assetFromUL').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Heco Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Sardis-x Network)');
        $('.tokenCheck').hide();
        $('#hecoTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/heco-logo.png');
        $('#reciveName').html('HT');
        $('#feeText').hide();
        addNetowrk('HECO');
        $('#reciveToken').html('');
    }
    if(name=="dht"){
        asset_Name = 'dht';
        asset_To = 'ht';
        network_From = 'tsrdx';
        network_To = 'heco'
        $('#assetFromUL').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/heco-logo.png"> HT (Heco Network)');
        $('.tokenCheck').hide();
        $('#dhecoTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/heco-logo.png');
        $('#reciveName').html('HT');
        $('#feeText').hide();
        addNetowrk('tSRDX');
        $('#reciveToken').html('');
    }
    if(name=="dusd"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDX (Sardis-x Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Binance Network)');
        asset_Name = 'dusd';
        asset_To = 'busd';
        network_From = 'srdx';
        network_To = 'bsc';
        $('.tokenCheck').hide();
        $('#dusdTokencheck').show();
        addNetowrk('SRDX');
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDT');        
        $('#feeText').hide();
        $('#reciveToken').html('');
    }
    if(name=="usdt"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        asset_Name = 'usdt';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'srdx';
        $('.tokenCheck').hide();
        $('#usdtTokencheck').show();
        addNetowrk('ETH');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#feeText').hide();
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled','disabled');
    }
    if(name=="usdtbsc"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDT (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDX (Sardis-x Network)');
        asset_Name = 'usdtbsc';
        network_From = 'bsc';
        network_To = 'srdx';
        asset_To = 'dusd';
        $('.tokenCheck').hide();
        $('#usdtbscTokencheck').show();
        addNetowrk('BNB');
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDX');
        $('#feeText').hide();
        $('#reciveToken').html('');
        $('#assetToUl').attr('disabled','disabled');
    }
    if(name=="usdc"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/usdc-logo.png"> USDC (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDX (Sardis-x Network)');
        asset_Name = 'usdc';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'tsrdx';
        $('.tokenCheck').hide();
        $('#usdcTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDX');
        $('#feeText').hide();
        addNetowrk('ETH');
        $('#reciveToken').html('');
    }
    if(name=="busd"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/busd-logo.png"> BUSD (Binance Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDX (Sardis-x Network)');
        asset_Name = 'busd';
        network_From = 'bsc';
        asset_To = 'dusd';
        network_To = 'tsrdx';
        $('.tokenCheck').hide();
        $('#busdTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDX');
        $('#feeText').hide();
        addNetowrk('BNB');
        $('#reciveToken').html('');
    }
    if(name=="dai"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/dai-logo.png"> DAI (Ethereum Network)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDX (Sardis-x Network)');
        $('.tokenCheck').hide();
        asset_Name = 'dai';
        network_From = 'eth';
        asset_To = 'dusd';
        network_To = 'tsrdx';
        $('#daiTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDX');
        $('#feeText').hide();
        addNetowrk('ETH');
        $('#reciveToken').html('');
    }
    if(name=="pax"){
        $('#assetFromUL').html('<img class="icons" src="assets/img/pax-logo.png"> PAX (Ethereum Netowoek)');
        $('#assetToUl').html('<img class="icons" src="assets/img/tether-usdt-logo.png"> USDX (Sardis-x Network)');
        asset_Name = 'pax';
        asset_To = 'dusd';
        network_From = 'eth';
        network_To = 'tsrdx';
        $('.tokenCheck').hide();
        $('#paxTokencheck').show();
        $('#receiveTokenImg').attr('src','assets/img/tether-usdt-logo.png');
        $('#reciveName').html('USDX');
        $('#feeText').hide();
        addNetowrk('ETH');
        $('#reciveToken').html('');
    }
    $('#tokenAmount').change();
});

//asset to token select
$('#assetTo li').click(async function(){
    var name = $(this).data('name');
    console.log(">>>@@@@>>> name >>>",name);
    if(name=="srds"){
        $('#assetToUl').html('<img class="icons" src="assets/img/srdx.png"> SRDS (Sardis Network)');
        $('.tokenCheckTo').hide();
        $('#srdsTokenTocheck').show();
        asset_To = 'srds';
        network_To = 'srds';
        $('#receiveTokenImg').attr('src','assets/img/srdx.png');
        $('#reciveName').html('SRDS');
        $('#reciveToken').html('');
    }
    if(name=="eurx"){
        $('#assetToUl').html('<img class="icons" src="assets/img/eurx.png"> EURX (Sardis-x Network)');
        $('.tokenCheckTo').hide();
        $('#eurxTokenTocheck').show();
        asset_To = 'eurx';
        network_To = 'srdx';
        $('#receiveTokenImg').attr('src','assets/img/eurx.png');
        $('#reciveName').html('EURX');
        $('#reciveToken').html('');
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        eurxPrice = edata['euro-coin'].usd;
    }
    if(name=="goldx"){
        $('#assetToUl').html('<img class="icons" src="assets/img/goldx.png"> GOLDX (Sardis-x Network)');
        $('.tokenCheckTo').hide();
        $('#goldxTokenTocheck').show();
        asset_To = 'goldx';
        network_To = 'srdx';
        $('#receiveTokenImg').attr('src','assets/img/goldx.png');
        $('#reciveName').html('GOLDX');
        $('#reciveToken').html('');
        const fetchResponse =  await fetch(extPriceAPI);
        const edata = await fetchResponse.json(); 
        goldxPrice = edata['pax-gold'].usd;
    }
    if(name=="usdx"){
        $('#assetToUl').html('<img class="icons" src="assets/img/usdx.png"> USDX (Sardis-x Network)');
        $('.tokenCheckTo').hide();
        $('#usdxTokenTocheck').show();
        asset_To = 'usdx';
        network_To = 'srdx';
        $('#receiveTokenImg').attr('src','assets/img/usdx.png');
        $('#reciveName').html('USDX');
        $('#reciveToken').html('');
    }
    $('#tokenAmount').change();
});

//add networks SARDIS
async function addNetowrk(network){
    //Sardis-x Network
    console.log("line412 :::",network);	
    if(network=='tSRDX'){
	console.log("line414 :::",network);	
        if(window.ethereum) {
	    console.log("line416 :::",network);	
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                    
                    params: [{ chainId: '0x2d5c' }], // , testnet = 0x2d5c
                });
		        chainID = 11612; 
            } catch (switchError) {
		console.log("line424 :::",network);	    
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
		console.log("line427 :::",network);	    	
                try {
		    console.log("line429 :::",network);	    	
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',                    
                        params: [{ chainId: '0x2d5c', rpcUrl: 'https://testnet-rpc.sardisnetwork.com' /* ... */ }],     blockExplorerUrls: ['https://contract-testnet.sardisnetwork.com/'] // mainnet 
                    });
                    chainID = 11612; 
                } catch (addError) {
                    // handle "add" error
			console.log("error ...",addError);
                }
                }
		console.log("switchError ...",switchError);    
                // handle other "switch" errors
            }
        }

    }
    //Sardis testnet
    if(network=='tSRDS'){
	console.log(">>>> NETWORK <<<<, window.ethereum",network, window.ethereum);    
        if(window.ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                    
                    params: [{ chainId: '0x8d6' }], // , testnet = 0x2d5c
                });
		        chainID = 2262; 
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',                    
                        params: [{ chainId: '0x8d6', rpcUrl: 'https://testnet-rpc.sardischain.com' /* ... */ }],     blockExplorerUrls: ['https://testnet-explorer.sardischain.com/'] // mainnet 
                    });
                    chainID = 2262; 
                } catch (addError) {
                    // handle "add" error
		    console.log("switchError ...",addError);  	
                }
                }
                // handle other "switch" errors
		console.log("switchError ...",switchError);      
            }
        }

    }
    //Sardis Network
    if(network=='SRDX'){
        if(window.ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                    
                    params: [{ chainId: '0xca00' }],
                });
		        chainID = 51712; 
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',                    
                        params: [{ chainId: '0xca00', rpcUrl: 'https://mainnet-rpc.sardischain.com/' /* ... */ }],  blockExplorerUrls: ['https://contract-mainnet.sardisnetwork.com/']// mainnet 
                    });
                    chainID = 51712; 
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }

    }
     //Sardis Network
     if(network=='SRDS'){
        if(window.ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                    
                    params: [{ chainId: '0x2cf8' }], // , 0x7d6
                });
		        chainID = 11512; //2006 
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',                    
                        params: [{ chainId: '0x2cf8', rpcUrl: 'https://payment-rpc.sardisnetwork.com' /* ... */ }],     blockExplorerUrls: ['https://payment-mainnet.sardisnetwork.com/'] // mainnet 
                    });
                    chainID = 11512; //2006; 
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }

    }


    //Ethereum Network
    if(network=='ETH'){
        if(window.ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                
                    params: [{ chainId: '0x1' }],
                });
	    	    chainID = 1;
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0x1', rpcUrl: 'https://mainnet.infura.io/v3/' /* ... */ }],   blockExplorerUrls: ['https://etherscan.io/']                  
                    });
                    chainID = 1;
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }

    }
    //TRX Network
    if(network=='TRX'){
        if (window.tronWeb && window.tronWeb.ready){
                global.tronUserAddress = await window.tronWeb.defaultAddress.base58;
                global.tronUserAddressHex = await window.tronWeb.defaultAddress.hex;
                global.loggedIn = true;
                showAccountInfo();
        }else{
            alertify.alert('Warning !','Please Login to Tronlink');
        }
    }
    //SOL Network
    if(network=='SOL'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0xa869',
                    chainName: "SOLANA Network",
                    nativeCurrency: {
                    name: "Solana",
                    symbol: "SOL",
                    decimals: 18
                    },
                    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],     blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
                }]
            })
        }
    }
    //BNB Network
    if(network=='BNB'){
        // if(window.ethereum) {
        //     window.web3 = new  Web3(window.ethereum)
        //     window.ethereum.request({method: 'eth_requestAccounts'})
        //     window.ethereum.request({
        //         method: 'wallet_addEthereumChain',
        //         params: [{chainId: '0x38', //testnet '0x61',
        //             chainName: "BSC Mainnet",
        //             nativeCurrency: {
        //             name: "Binance Chain",
        //             symbol: "BNB",
        //             decimals: 18
        //             },
        //             rpcUrls: ['https://bsc-dataseed.binance.org'],     blockExplorerUrls: ['https://bscscan.com']                    
        //         }]
        //     })
        //     chainID = 56;
        //     checkAccount();
        // }

        if(window.ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',                    
                    params: [{ chainId: '0x38' }],  //testnet '0x61', mainnet 0x38
                });
		        chainID = 56; //mainnet 56 testnet 97 
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',                    
                        params: [{ chainId: '0x38', rpcUrl: 'https://bsc-dataseed.binance.org' /* ... */ }],     blockExplorerUrls: ['https://bscscan.com'] // mainnet 
                    });
                    chainID = 56; //mainnet 56 testnet 97; 
                } catch (addError) {
                    // handle "add" error
                }
                }
                // handle other "switch" errors
            }
        }
    }
    //Polygon Network
    if(network=='POLYGON'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0x13881', 
                    chainName: "Mumbai Testnet",
                    nativeCurrency: {
                    name: "Polygon",
                    symbol: "MATIC",
                    decimals: 18
                    },
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],     blockExplorerUrls: ['https://mumbai.polygonscan.com']
                }]
            })
            chainID = 80001;
            checkAccount();
        }
    }
    //Heco Network
    if(network=='HECO'){
        if(window.ethereum) {
            window.web3 = new  Web3(window.ethereum)
            window.ethereum.request({method: 'eth_requestAccounts'})
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{chainId: '0x100', //testnet '0x100', 
                    chainName: "Heco-Testnet",
                    nativeCurrency: {
                    name: "Heco",
                    symbol: "HT",
                    decimals: 18
                    },
                    rpcUrls: ['https://http-testnet.hecochain.com'],     blockExplorerUrls: ['https://testnet.hecoinfo.com/']                    
                }]
            })
            chainID = 256;
            checkAccount();
        }
    }

}
//token amount key press event 
$('#tokenAmount').on('keyup keydown change', async function(e){
    if($(this).val() < 0 ){
        $(this).val(1);
    }else{
        if(network_From=='eth' & network_To=='srdx' & asset_Name=='eth' & asset_To=='srdx'){
            
            var amount = $(this).val();
            amount = amount * ethPrice;
            $('#reciveToken').html(amount.toFixed(4));

        }else if(network_From=='bsc' & network_To=='srdx' & asset_Name=='bnb' & asset_To=='srdx'){
            
                var amount = $(this).val();
                amount = amount * bnbPrice;
                $('#reciveToken').html(amount.toFixed(4));
        }else if(network_From=='srdx' & network_To=='srdx' & asset_Name=='eurx' & asset_To=='srdx'){
            
                var amount = $(this).val();
                amount = amount * eurxPrice;
                $('#reciveToken').html(amount.toFixed(4));
        }else if(network_From=='srdx' & network_To=='srdx' & asset_Name=='goldx' & asset_To=='srdx'){
            
                var amount = $(this).val();
                amount = amount * goldxPrice;
                $('#reciveToken').html(amount.toFixed(4));
        }else if(network_From=='srdx' & network_To=='srdx' & asset_Name=='srdx' & asset_To=='eurx'){
            
                var amount = $(this).val();
                amount = amount/eurxPrice;
                console.log(eurxPrice);
                $('#reciveToken').html(amount.toFixed(4));
        }else if(network_From=='srdx' & network_To=='srdx' & asset_Name=='srdx' & asset_To=='goldx'){
            
                var amount = $(this).val();
                amount = amount / goldxPrice;
                $('#reciveToken').html(amount.toFixed(4));
        
        
        }else{
            $('#reciveToken').html($(this).val());
        }
        
    } 

});

//function for tx alert etc
async function processTx(data,contractAddress,web3GasPrice,gasLimit,value,TX_URL){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && window.ethereum.isMetaMask==true) {
            web3GasPrice = web3GasPrice.toString();
            gasLimit = gasLimit.toString();
            web3GasPrice =  myweb3.utils.toHex(web3GasPrice);
            gasLimit =  myweb3.utils.toHex(gasLimit);
            value = value.toString();
            value = myweb3.utils.toHex(value);
            var nonce = await myweb3.eth.getTransactionCount(myAccountAddress, 'pending');
            nonce= myweb3.utils.toHex(nonce);
            console.log(nonce);
            const transactionParameters = {
                nonce: nonce, // ignored by MetaMask
                gasPrice: web3GasPrice, // customizable by user during MetaMask confirmation.
                gas: gasLimit, // customizable by user during MetaMask confirmation.
                to: contractAddress, // Required except during contract publications.
                from: myAccountAddress, // must match user's active address.
                value: value, // Only required to send ether to the recipient from the initiating external account.
                data: data, // Optional, but used for defining smart contract creation and interaction.
                //chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
        
            // txHash is a hex string
            // As with any RPC call, it may throw an error
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            if(txHash){
                alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>The Bridge will send you the coins soon.<br>'+
                'You can check transaction details into History page.<br>'+
                'If you have any questions, please reach out to '+NETWORK_NAME+' Bridge Support', function(){});  
            }
    }else{   
        value = logEtoLongNumber(value);
        myweb3.eth.sendTransaction({
            from: myAccountAddress,
            to: contractAddress,
            //gasPrice: localStorage.getItem('ethGasPrice'),
            gasPrice : web3GasPrice,
            gasLimit: gasLimit,
            data: data, // deploying a contracrt
            value : value,
            }).on('transactionHash',function(hash){
                alertify.alert("Transaction Recorded","Please wait upto 5 min for your coins to reflect.<br>" +
                                                    "Please check the status of transaction <a href='"+TX_URL+hash+"' target='_blank'> Here</a>", function(){});
            }).on('receipt', function(receipt){
                alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>The Bridge will send you the coins soon.<br>'+
                                                       'You can check transaction details into History page.<br>'+
                                                       'If you have any questions, please reach out to '+NETWORK_NAME+' Bridge Support', function(){});  
            }).on('error',function(error){
                var ErrorMsg=error.message;
                alertify.alert('Error', ""+ErrorMsg, function(){});
            });
    }
}
async function processTx2(data,contractAddress,web3GasPrice,gasLimit,value,TX_URL){
    value = logEtoLongNumber(value);
    //value = myweb3.utils.toHex(value);
    myweb3.eth.sendTransaction({
        from: myAccountAddress,
        to: contractAddress,
        gasPrice : web3GasPrice,
        gasLimit: gasLimit,
        data: data, // deploying a contracrt
        value : value,
        }).on('transactionHash',function(hash){
            alertify.alert("Transaction Recorded","Please wait upto 5 min for your coins to reflect.<br>" +
                                                "Please check the status of transaction <a href='"+TX_URL+hash+"' target='_blank'> Here</a>", function(){});
        }).on('receipt', function(receipt){
            alertify.alert('Transaction Success', 'Your transaction is confirmed successfully.<br>The Bridge will send you the coins soon.<br>'+
                                                    'You can check transaction details into History page.<br>'+
                                                    'If you have any questions, please reach out to '+NETWORK_NAME+' Bridge Support', function(){});  
        }).on('error',function(error){
            var ErrorMsg=error.message;
            alertify.alert('Error', ""+ErrorMsg, function(){});
        });
}
//coinIn code 

function logEtoLongNumber(amountInLogE){
    
    amountInLogE = amountInLogE.toString();
    var noDecimalDigits = "";
  
    if(amountInLogE.includes("e-")){
      
      var splitString = amountInLogE.split("e-"); //split the string from 'e-'
  
      noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
  
      //how far decimals to move
      var zeroString = "";
      for(var i=1; i < splitString[1]; i++){
        zeroString += "0";
      }
  
      return  "0."+zeroString+noDecimalDigits;
      
    }
    else if(amountInLogE.includes("e+")){
  
      var splitString = amountInLogE.split("e+"); //split the string from 'e+'
      var ePower = parseInt(splitString[1]);
  
      noDecimalDigits = splitString[0].replace(".", ""); //remove decimal point
  
      if(ePower >= noDecimalDigits.length-1){
        var zerosToAdd = ePower  - noDecimalDigits.length;
  
        for(var i=0; i <= zerosToAdd; i++){
          noDecimalDigits += "0";
        }
  
      }
      else{
        //this condition will run if the e+n is less than numbers
        var stringFirstHalf = noDecimalDigits.slice(0, ePower+1);
        var stringSecondHalf = noDecimalDigits.slice(ePower+1);
  
        return stringFirstHalf+"."+stringSecondHalf;
      }
      return noDecimalDigits;
    }
    return amountInLogE;  //by default it returns stringify value of original number if its not logarithm number
  }

$('#btnNext').click(async function(){
var myHeaders = new Headers();
myHeaders.append("Cookie", "PHPSESSID=jdvq6anqqlvtn866q31as92foo; currency=USD; language=en");

var formdata = new FormData();
formdata.append("wallet", myAccountAddress);
formdata.append("token", myToken);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
const fetchResponse =  await fetch(customURL,requestOptions);
    
const edata = await fetchResponse.json(); 

if(edata.success==false){
    alertify.alert("Warning","Your wallet is not KYC verified. Please get KYC verification at <a style='text-decoration: underline;' href='https://kyc.sardisnetwork.com'>kyc.sardisnetwork.com</a>");
    return false;
}
 if(edata.success==true){
     if(edata.kyc_status == false){
        alertify.alert("Warning","Your wallet is not KYC verified. Please get KYC verification at <a style='text-decoration: underline;' href='https://kyc.sardisnetwork.com'>kyc.sardisnetwork.com</a>");
        return false;
     }
 }



    var confirmMessage = '';
    var tokenAmount = $('#tokenAmount').val();
    var tAmount = tokenAmount;
    //var approveAmount = '1000000000000000000000000000000';
    var approveAmount = logEtoLongNumber(1000000000000000000000000000000000);
        if(tokenAmount==0 || tokenAmount=="" || tokenAmount<0){
            alertify.alert("Warning","Please enter Amount.");
            return false;
        }
    if(network_From=='eth'){
        if(asset_Name=='eth'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }   
           // confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' ETH (Ethereum Network) to ' +  tokenAmount +' ETH (Sardis Network)';
           var reciveToken = $('#reciveToken').text();
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +'  ETH (Ethereum Network) to ' +  reciveToken +' SRDX (Sardis Network)';
        }        
        if(asset_Name=='usdt'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            } 
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDT (Ethereum Network) to ' +  tokenAmount +' SRDX (Sardis Network)';
        }
        if(asset_Name=='usdc'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDC (Ethereum Network) to ' +  tokenAmount +' SRDX (Sardis Network)';
        }
        if(asset_Name=='dai'){
            if(tokenAmount<10){
                alertify.alert("Warning","Minimum Amount is 10");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' DAI (Ethereum Network) to ' +  tokenAmount +' SRDX (Sardis Network)';
        }
        if(asset_Name=='pax'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' PAX (Ethereum Network) to ' +  tokenAmount +' SRDX (Sardis Network)';
        }

    }



    if(network_From=='tsrdx'){
        if(asset_Name=='tsrdx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' tSRDX (Sardis-x Network) to ' +  tokenAmount +' tSRDS (Sardis Network)';
        }

    }
    if(network_From=='tsrds'){
        if(asset_Name=='tsrds'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' tSRDS (Sardis Network) to ' +  tokenAmount +' tSRDX (Sardis-x Network)';
        }
        
    }
    if(network_From=='srds'){
        if(asset_Name=='srds'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' SRDS (Sardis Network) to ' +  tokenAmount +' SRDX (Sardis-x Network)';
        }
        
    }
    if(network_From=='srdx'){
        if(asset_Name=='srdx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            if(asset_To=='srds'){
                confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' SRDX (Sardis-x Network) to ' +  tokenAmount +' SRDS (Sardis Network)';
            }
            if(asset_To=='eurx'){
                var convAmount = $('#tokenAmount').val();
                convAmount = convAmount/eurxPrice;
                convAmount =convAmount.toFixed(4);
                confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' SRDX (Sardis-x Network) to ' +  convAmount +' EURX (Sardis-x Network)';
            }
            if(asset_To=='goldx'){
                var convAmount = $('#tokenAmount').val();
                convAmount = convAmount/goldxPrice;
                convAmount =convAmount.toFixed(4);
                confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' SRDX (Sardis-x Network) to ' +  convAmount +' GOLDX (Sardis-x Network)';
            }
            if(asset_To=='usdx'){
                confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' SRDX (Sardis-x Network) to ' +  tokenAmount +' USDX (Sardis-x Network)';
            }
        }
        if(asset_Name=='dusd'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDX (Sardis-x Network) to ' +  tokenAmount +' USDT (Binance Network)';
        }
        if(asset_Name=='eurx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
                var convAmount = $('#tokenAmount').val();
                convAmount = convAmount * eurxPrice;
                convAmount = convAmount.toFixed(4);
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' EURX (Sardis-x Network) to ' +  convAmount +' SRDX (Sardis-x Network)';
        }
        if(asset_Name=='goldx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            var convAmount = $('#tokenAmount').val();
            convAmount = convAmount * goldxPrice;
            convAmount = convAmount.toFixed(4);
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' GOLDX (Sardis-x Network) to ' +  convAmount +' SRDX (Sardis-x Network)';
        }
        if(asset_Name=='usdx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDX (Sardis-x Network) to ' +  tokenAmount +' SRDX (Sardis-x Network)';
        }
    }


    if(network_From=='tsrdx'){
        if(asset_Name=='tsrdx'){
            if(tokenAmount<0.0025){
                alertify.alert("Warning","Minimum Amount is 0.0025");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' tSRDX (Sardis-x Network) to ' +  tokenAmount +' tSRDS (Sardis Network)';
        }

        if(asset_Name=='dbnb'){
            if(tokenAmount<0.02){
                alertify.alert("Warning","Minimum Amount is 0.02");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BNB (Sardis Network) to ' +  tokenAmount +' BNB (Binance Network)';
        }

        if(asset_Name=='dmatic'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' MATIC (Sardis Network) to ' +  tokenAmount +' MATIC (Polygon Network)';
        }        

        if(asset_Name=='dht'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' HT (Sardis Network) to ' +  tokenAmount +' HT (Heco Network)';
        }

        if(asset_Name=='dusd'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDX (Sardis Network) to ' +  tokenAmount +' USDT (Binance Network)';
        }

        if(asset_Name=='dtrx'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' TRX (Sardis Network) to ' +  tokenAmount +' TRX (TRON Network)';
        }        
    }
    




    if(network_From=='bsc'){
        if(asset_Name=='bnb'){
            if(tokenAmount<0.02){
                alertify.alert("Warning","Minimum Amount is 0.02");
                return false;
            }
            //confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BNB (Binance Network) to ' +  tokenAmount +' BNB (Sardis Network)';
            var reciveToken = $('#reciveToken').text();
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BNB (Binance Network) to ' +  reciveToken +' SRDX (Sardis Network)';
        }

        if(asset_Name=='usdtbsc'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' USDT (Binance Network) to ' +  tokenAmount +' USDX (Sardis Network)';
        }

        if(asset_Name=='busd'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' BUSD (Binance Network) to ' +  tokenAmount +' USDX (Sardis Network)';
        }
    }


    if(network_From=='polygon'){
        if(asset_Name=='matic'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' MATIC (Polygon Network) to ' +  tokenAmount +' MATIC (Sardis Network)';
        }
    }


    if(network_From=='heco'){
        if(asset_Name=='ht'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' HT (Heco Network) to ' +  tokenAmount +' HT (Sardis Network)';
        }
    }

    if(network_From=='trx'){
        if(asset_Name=='trx'){
            if(tokenAmount<0.01){
                alertify.alert("Warning","Minimum Amount is 0.01");
                return false;
            }
            confirmMessage = 'Are you sure you want to swap ? <br>' +  tokenAmount +' TRX (TRON Network) to ' +  tokenAmount +' TRX (Sardis Network)';
        }
    }




    alertify.confirm('Confirm Transaction', confirmMessage, async function(){
        tokenAmount = tokenAmount*1e18;
       //tokenAmount = ""+tokenAmount;
    //eth network
    if(network_From=='eth'){
        ethContractInstance = new myweb3.eth.Contract(ethereumABI, ethereumContract, {
            from: myAccountAddress, // default from address
        });
        
        
        var gasLimit = 150000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_Name=='eth'){
	      
		
              var data = ethContractInstance.methods.coinIn().encodeABI();
              processTx(data,ethereumContract,web3GasPrice,gasLimit,tokenAmount,ETHERSCAN_URL);
        }
        if(asset_Name=='usdt' || asset_Name=='usdc' || asset_Name=='dai' || asset_Name=='pax'){          
            
            if(asset_Name=='usdt'){  
		    var tokenAmountUSDT = tAmount*1e6;
                usdtContractInstance =  new myweb3.eth.Contract(usdtEthABI, usdtEthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
               
                if(allowance<tAmount){
                    var result = await usdtContractInstance.methods.approve(ethereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtEthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmountUSDT,chainID).encodeABI();
                    processTx2(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmountUSDT,chainID).encodeABI();
                    processTx2(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='usdc'){
                assetContract = usdcAddress;
                usdcContractInstance =  new myweb3.eth.Contract(usdcABI, usdcAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdcContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result = await usdcContractInstance.methods.approve(ethereumContract,tokenAmount).send({
                        from: myAccountAddress,
                        to: usdcAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);                  
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='dai'){
                assetContract = daiAddress;
                daiContractInstance =  new myweb3.eth.Contract(daiABI, daiAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await daiContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result = await daiContractInstance.methods.approve(ethereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: daiAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
            if(asset_Name=='pax'){
                assetContract = paxAddress;
                paxContractInstance =  new myweb3.eth.Contract(usdcABI, paxAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await paxContractInstance.methods.allowance(myAccountAddress,ethereumContract).call();
                if(allowance<tAmount){
                    var result = paxContractInstance.methods.approve(ethereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: paxAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
                }
            }
               
        }
    }
   
    //tsrdx network
    if(network_From=='tsrdx'){
	console.log("Selected- network_From, asset_To",network_From, asset_To);
        ethContractInstance = new myweb3.eth.Contract(tsrdxABI, tsrdxContract, {	
            from: myAccountAddress, // default from address
        });
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_To=='tsrds'){
            
            var data = ethContractInstance.methods.coinIn().encodeABI();
            processTx(data,tsrdxContract,web3GasPrice,gasLimit,tokenAmount,TSRDXSCAN_URL);
            
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
        if(asset_To=='eth'){
            usdtContractInstance =  new myweb3.eth.Contract(ethDthABI, ethDthAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result = await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: ethDthAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var data = ethContractInstance.methods.tokenIn(ethDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
               
            }else{
                var data = ethContractInstance.methods.tokenIn(ethDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
            }
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
        if(asset_To=='usdt' || asset_To=='usdc' || asset_To=='dai' || asset_To=='pax'){          
            
            if(asset_To=='usdt'){ 
                usdtContractInstance =  new myweb3.eth.Contract(usdtEthABI, usdtEthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtEthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
            }
            if(asset_To=='usdc'){
                usdcContractInstance =  new myweb3.eth.Contract(usdcABI, usdcAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdcContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result = await usdcContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdcAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(usdcAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
            
            if(asset_To=='dai'){
                daiContractInstance =  new myweb3.eth.Contract(daiABI, daiAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await daiContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result =await daiContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: daiAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(daiAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
            if(asset_To=='pax'){
                paxContractInstance =  new myweb3.eth.Contract(paxABI, paxAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await paxContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result =await paxContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: paxAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = ethContractInstance.methods.tokenIn(paxAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL);
            }
        }

            if(asset_To=='bnb'){
                bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                    from: myAccountAddress, // default from address
                });
                
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(bnbDthABI, bnbDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
                
                if(allowance<tAmount){
                    var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: bnbDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(bnbDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(bnbDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
            }
    
            if(asset_To=='usdtbsc'){
                bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                    from: myAccountAddress, // default from address
                });
               
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(usdtBscABI, usdtBscAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: usdtBscAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
                    
            }
            if(asset_To=='busd'){
                // bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
                //     from: myAccountAddress, // default from address
                // });
                
               
                var gasLimit = 200000;
                const web3GasPrice = await myweb3.eth.getGasPrice();
                usdtContractInstance =  new myweb3.eth.Contract(dusdDthABI, dusdDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: dusdDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                //var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
            }  

            if(network_To=='polygon'){
                polygonContractInstance = new myweb3.eth.Contract(polygonABI, polygonContract, {
                    from: myAccountAddress, // default from address
                });
                
                if(asset_To=='matic'){
                   
                    var gasLimit = 200000;
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                    //var data = polygonContractInstance.methods.coinIn().encodeABI();
                    usdtContractInstance =  new myweb3.eth.Contract(maticdDthABI, maticDthAddress, {
                        from: myAccountAddress, // default from address
                    });
                    const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
                   
                    if(allowance<tAmount){
                        var result = await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                            from: myAccountAddress,
                            to: maticDthAddress,
                            gasPrice: web3GasPrice,
                            gasLimit: gasLimit,
                            value : 0,       
                        });
                        await delay(5000);
                        var data = ethContractInstance.methods.tokenIn(maticDthAddress,tokenAmount,chainID).encodeABI();
                        processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                       
                    }else{
                        var data = ethContractInstance.methods.tokenIn(maticDthAddress,tokenAmount,chainID).encodeABI();
                        processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                    }

                    //var data = polygonContractInstance.methods.tokenIn(polygonContract,tokenAmount,chainID).encodeABI();
                    //processTx(data,polygonContract,web3GasPrice,gasLimit,0,POLYSCAN_URL);
                }
            }

            if(network_To=='heco'){
                hecoContractInstance = new myweb3.eth.Contract(hecoABI, hecoContract, {
                    from: myAccountAddress, // default from address
                });
                
                if(asset_To='ht'){
                    var gasLimit = 200000;
                    const web3GasPrice = await myweb3.eth.getGasPrice();
                   // var data = hecoContractInstance.methods.coinIn().encodeABI();
                   usdtContractInstance =  new myweb3.eth.Contract(htDthABI, htDthAddress, {
                    from: myAccountAddress, // default from address
                });
                const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
               
                if(allowance<tAmount){
                    var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                        from: myAccountAddress,
                        to: htDthAddress,
                        gasPrice: web3GasPrice,
                        gasLimit: gasLimit,
                        value : 0,       
                    });
                    await delay(5000);
                    var data = ethContractInstance.methods.tokenIn(htDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                   
                }else{
                    var data = ethContractInstance.methods.tokenIn(htDthAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,TSRDXSCAN_URL);
                }

                 //  var data = hecoContractInstance.methods.tokenIn(hecoContract,tokenAmount,chainID).encodeABI();
                  //  processTx(data,hecoContract,web3GasPrice,gasLimit,0,HECOSCAN_URL);
                }
            }
            if(network_To=='trx'){
                if(asset_To=='trx'){
                    let result = await tronContractInstance.coinIn().send({
                        feeLimit: 50000000,
                        callValue: tokenAmount,
                        from: global.userAddress
                    });
                        alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
                        'You can check transaction here, ' +
                        '<a target="_blank" href="'+TRONSCAN_URL+result+'"><b>click here</b></a>');
                }
            }
    }
    //tsrds network
    if(network_From=='tsrds'){
	console.log("Selected- network_From, asset_To",network_From, asset_To);
        ethContractInstance = new myweb3.eth.Contract(tsrdsABI, tsrdsContract, {	
            from: myAccountAddress, // default from address
        });
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_To=='tsrdx'){
            
            var data = ethContractInstance.methods.coinIn().encodeABI();
            processTx(data,tsrdsContract,web3GasPrice,gasLimit,tokenAmount,TSRDSSCAN_URL);
            
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
    }
    //srdx network mainnet
    if(network_From=='srdx'){
	console.log("Selected- network_From, asset_To",network_From, asset_To);
        ethContractInstance = new myweb3.eth.Contract(dithereumABI, dithereumContract, {	
            from: myAccountAddress, // default from address
        });
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_To=='srds'){
            
            var data = ethContractInstance.methods.coinIn('0x0000000000000000000000000000000000000000').encodeABI();
            processTx(data,dithereumContract,web3GasPrice,gasLimit,tokenAmount,SRDXSCAN_URL);
            
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
        if(asset_To=='usdt'){ 
            
            var usdxContractInstance =  new myweb3.eth.Contract(dusdDthABI, dusdDthAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdxContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result =await usdxContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: dusdDthAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
               
            }else{
                var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
            }

            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
        if(asset_To=='busd'){
            // bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
            //     from: myAccountAddress, // default from address
            // });
            
           
            var gasLimit = 200000;
            const web3GasPrice = await myweb3.eth.getGasPrice();
            usdtContractInstance =  new myweb3.eth.Contract(dusdDthABI, dusdDthAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: dusdDthAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
               
            }else{
                var data = ethContractInstance.methods.tokenIn(dusdDthAddress,tokenAmount,chainID).encodeABI();
                processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
            }

            //var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);
        }  
        if(asset_Name=='eurx'){
         
            var gasLimit = 200000;
            const web3GasPrice = await myweb3.eth.getGasPrice();
            usdtContractInstance =  new myweb3.eth.Contract(eurxABI, eurxAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result = await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: eurxAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(eurxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(eurxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }

            }else{
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(eurxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(eurxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }
            }
        }
        if(asset_Name=='goldx'){
            var gasLimit = 200000;
            const web3GasPrice = await myweb3.eth.getGasPrice();
            usdtContractInstance =  new myweb3.eth.Contract(goldxABI, goldxAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: goldxAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(goldxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(goldxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }
               
            }else{
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(goldxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(goldxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }
            }
        }
        if(asset_Name=='usdx'){
            var gasLimit = 200000;
            const web3GasPrice = await myweb3.eth.getGasPrice();
            usdtContractInstance =  new myweb3.eth.Contract(usdxABI, usdxAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtContractInstance.methods.allowance(myAccountAddress,dithereumContract).call();
           
            if(allowance<tAmount){
                var result =await usdtContractInstance.methods.approve(dithereumContract,approveAmount).send({
                    from: myAccountAddress,
                    to: usdxAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(usdxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }
               
            }else{
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile && window.ethereum.isMetaMask==true) {
                    var data = ethContractInstance.methods.tokenIn(usdxAddress,tokenAmount,chainID).encodeABI();
                    processTx2(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);
                }else{
                    var data = ethContractInstance.methods.tokenIn(usdxAddress,tokenAmount,chainID).encodeABI();
                    processTx(data,dithereumContract,web3GasPrice,gasLimit,0,SRDXSCAN_URL);     
                }
            }
        }
        if(asset_Name=='srdx'){
            if(asset_To=='eurx'){
                var data = ethContractInstance.methods.coinIn(eurxAddress).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,tokenAmount,SRDXSCAN_URL);
            }
            if(asset_To=='goldx'){
                var data = ethContractInstance.methods.coinIn(goldxAddress).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,tokenAmount,SRDXSCAN_URL);
            }
            if(asset_To=='usdx'){
                var data = ethContractInstance.methods.coinIn(usdxAddress).encodeABI();
                processTx(data,dithereumContract,web3GasPrice,gasLimit,tokenAmount,SRDXSCAN_URL);
            }
            
        }
    }
    //srds network
    if(network_From=='srds'){
	console.log("Selected- network_From, asset_To",network_From, asset_To);
        ethContractInstance = new myweb3.eth.Contract(paymentBridgeABI, paymentBridgeContract, {	
            from: myAccountAddress, // default from address
        });
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        if(asset_To=='srdx'){
            
            var data = ethContractInstance.methods.coinIn().encodeABI();
            processTx(data,paymentBridgeContract,web3GasPrice,gasLimit,tokenAmount,SRDSSCAN_URL);
            
            //var data = ethContractInstance.methods.tokenIn(usdtEthAddress,tokenAmount,chainID).encodeABI();
            //processTx(data,ethereumContract,web3GasPrice,gasLimit,0,ETHERSCAN_URL); 
        }
    }
    //bsc network
    if(network_From=='bsc'){
        bscContractInstance = new myweb3.eth.Contract(bscABI, bscContract, {
            from: myAccountAddress, // default from address
        });
        
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();

        if(asset_Name=='bnb'){
            var data = bscContractInstance.methods.coinIn().encodeABI();
            processTx(data,bscContract,web3GasPrice,gasLimit,tokenAmount,BSCSCAN_URL);
        }

        if(asset_Name=='usdtbsc'){
            var usdtbscContractInstance =  new myweb3.eth.Contract(usdtBscABI, usdtBscAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await usdtbscContractInstance.methods.allowance(myAccountAddress,bscContract).call();
            if(allowance<tAmount){
                var result =await usdtbscContractInstance.methods.approve(bscContract,approveAmount).send({
                    from: myAccountAddress,
                    to: usdtBscAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                processTx2(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);     
            }else{
                var data = bscContractInstance.methods.tokenIn(usdtBscAddress,tokenAmount,chainID).encodeABI();
                processTx2(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);     
            }            
        }
        if(asset_Name=='busd'){
            var busdbscContractInstance =  new myweb3.eth.Contract(busdBscABI, busdBscAddress, {
                from: myAccountAddress, // default from address
            });
            const allowance = await busdbscContractInstance.methods.allowance(myAccountAddress,bscContract).call();
            if(allowance<tAmount){
                var result =await busdbscContractInstance.methods.approve(bscContract,approveAmount).send({
                    from: myAccountAddress,
                    to: busdBscAddress,
                    gasPrice: web3GasPrice,
                    gasLimit: gasLimit,
                    value : 0,       
                });
                await delay(5000);
                var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);      
            }else{
                var data = bscContractInstance.methods.tokenIn(busdBscAddress,tokenAmount,chainID).encodeABI();
                processTx(data,bscContract,web3GasPrice,gasLimit,0,BSCSCAN_URL);   
            } 
            
        }
    }
    //polygon network
    if(network_From=='polygon'){
        polygonContractInstance = new myweb3.eth.Contract(polygonABI, polygonContract, {
            from: myAccountAddress, // default from address
        });
        
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        var data = polygonContractInstance.methods.coinIn().encodeABI();
        processTx(data,polygonContract,web3GasPrice,gasLimit,tokenAmount,POLYSCAN_URL);            
    }
    //heco network
    if(network_From=='heco'){
        hecoContractInstance = new myweb3.eth.Contract(hecoABI, hecoContract, {
            from: myAccountAddress, // default from address
        });
       
       
        var gasLimit = 200000;
        const web3GasPrice = await myweb3.eth.getGasPrice();
        var data = hecoContractInstance.methods.coinIn().encodeABI();
        processTx(data,hecoContract,web3GasPrice,gasLimit,tokenAmount,HECOSCAN_URL);            
    }
    //trx network
    if(network_From=='trx'){
        var contractInfo = await tronWeb.trx.getContract(tronContract);
        tronContractInstance = await tronWeb.contract(contractInfo.abi.entrys,tronContract);
        //tronContractInstance = await tronWeb.contract(JSON.parse('{"entrys":[{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinIn","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinOut","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"CoinOutFailed","type":"Event"},{"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenIn","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenOut","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenAddress","type":"address"},{"indexed":true,"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"TokenOutFailed","type":"Event"},{"name":"acceptOwnership","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_signer","type":"address"}],"name":"changeSigner","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"name":"coinIn","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"user","type":"address"},{"name":"amount","type":"uint256"}],"name":"coinOut","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address"}],"name":"signer","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokenAmount","type":"uint256"}],"name":"tokenIn","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"tokenAddress","type":"address"},{"name":"user","type":"address"},{"name":"tokenAmount","type":"uint256"}],"name":"tokenOut","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","stateMutability":"Nonpayable","type":"Function"},{"stateMutability":"Payable","type":"Receive"}]}',tronContract));
        tokenAmount = $('#tokenAmount').val();
        tokenAmount = tokenAmount*1000000;
        if(asset_Name=='trx'){
            let result = await tronContractInstance.coinIn().send({
                feeLimit: 50000000,
                callValue: tokenAmount,
                from: global.userAddress
            });
            //if(result){
                alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
                'You can check transaction here, ' +
                '<a target="_blank" href="'+TRONSCAN_URL+result+'"><b>click here</b></a>');
            
          //  }else{
           //     alertify.alert("Fail","Transaction Fail, Please Try again.");
         //   }
        }
        if(asset_To=='usdt'){
                    let result = await tronContractInstance.tokenIn(usdtTronAddress,tokenAmount).send({
                        feeLimit: 5000000,
                        callValue: 0,
                        from: global.userAddress
                    });
                  //  if(result){
                        alertify.alert('Success','Please wait upto 5 min for your coins to reflect.<br>' +
					                'You can check transaction here, ' +
                                    '<a target="_blank" href="'+ETHERSCAN_URL+result.transactionHash+'"><b>click here</b></a>');
                    
                   // }else{
                  //      alertify.alert("Fail","Transaction Fail, Please Try again.");
                  //  }
                
        }
    }
}, function(){ });
})

// TRON CODE
let intervalID = setInterval(async function() {
    if (typeof window.tronWeb == "object") {
    	window.tronWeb.on("addressChanged", showAccountInfo);
        var userAddress = await window.tronWeb.defaultAddress.base58;
        var userAddressHex = await window.tronWeb.defaultAddress.hex;    
        
        if(global.tronUserAddress=='' && userAddress!=''){
            global.tronUserAddress =  userAddress;
            global.tronUserAddressHex =  userAddressHex;               	
        }
        if(global.tronUserAddress!='' && global.tronUserAddress!=userAddress){
            global.tronUserAddress =  userAddress;
            global.tronUserAddressHex =  userAddressHex;    
            location.reload();
        }
    }
    	
}, 1000);

function showAccountInfo(){    
        const shortAddress = getUserAddress(global.tronUserAddress);
        $('#connectWallet,#connectWallet1').html(shortAddress);
        $('#connectWallet,#connectWallet1').attr("href", "https://tronscan.org/#/address/"+global.tronUserAddress).attr('target','_blank');
        $('#connectWallet1').hide();
        $('#btnNext').show();
}
