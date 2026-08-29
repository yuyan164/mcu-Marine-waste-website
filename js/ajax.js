var Now_SN;
function none(){
    return;
}
function show_payment(){
    $.ajax({
        url: "session_payment.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
            document.getElementById("paycode").focus()
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function show_remaining(){
    $.ajax({
        url: "session_remaining.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
            document.getElementById("paycode").focus()
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function show_artfungo(){
    $.ajax({
        url: "session_artfungo.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
            document.getElementById("paycode").focus()
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function payment(){
    var SN = $("#paycode").val();
    Now_SN = SN;
    $.ajax({
        url: "sale.php",
        data:{
            serialnumber: SN
        },
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#salepage_content").html(output);
            document.getElementById("pay_value").focus()
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function process_payment(){
    var SN = Now_SN;
    var pay_value = $("#pay_value").val();
    var bill_value = $("#bill_value").val();
    var invoice_code = $("#invoice_code").val();
    var information = $("#invoice_code").val();
    if (confirm('【※警告※】您是否確定執行以下扣款作業?\r\n商品卡: '+SN+'\r\n扣款金額: '+pay_value+'元\r\n注意!按下確定後無法取消該交易!')) {
        $.ajax({
            
            url: "process_payment.php",
            data:{
                serialnumber: SN,
                pay_value: pay_value,
                bill_value: bill_value,
                invoice_code: invoice_code,
                information: information
            },
            type: "POST",
            datatype: "html",
            success:  function(output){
                $("#salepage_content").html(output);
                window.scrollTo(0, document.body.scrollHeight);
            },
            error: function(){
                alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
            }
        });
    }
}
function remaining(){
    var SN = $("#paycode").val();
    $.ajax({
        url: "search.php",
        data:{
            serialnumber: SN
        },
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#salepage_content").html(output);
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function process_artfungo(){
    var SN = $("#paycode").val();
    $.ajax({
        url: "artfungo.php",
        data:{
            serialnumber: SN
        },
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#salepage_content").html(output);
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}

function show_record(){
    $.ajax({
        url: "session_record.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function search_daterecord(){
    var date = $("#searchdate").val();
    $.ajax({
        url: "search_daterecord.php",
        data:{
            searchdate: date
        },
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#search_content").html(output);
            
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function show_weekly(){
    $.ajax({
        url: "weekly.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function show_enable(){
    $.ajax({
        url: "session_enable.php",
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#page").html(output);
            window.scrollTo(0, document.body.scrollHeight);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}
function card_enable(){
    var startcode = $("#startcode").val();
    var customer = $("#customer").val();
    var operation= $("#operation").val();
    alert(operation);
    $.ajax({
        url: "enable.php",
        data:{
            startcode: startcode,
            customer: customer,
            operation: operation
        },
        type: "POST",
        datatype: "html",
        success:  function(output){
            $("#enablebox").html(output);
        },
        error: function(){
            alert("驗證失敗，請登出並重新登入本系統!\n錯誤代碼：P99");
        }
    });
}