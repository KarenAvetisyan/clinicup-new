<?php
header('Content-Type: text/html; charset=UTF-8');
mb_internal_encoding("UTF-8");

// ==== Mail settings ====
$to = "emailto";  
$from = "info@domen.ru";
$fromName = "Новая заявка";

// ==== Define all possible fields ====
$fields = [
    // Contact info
    'organisation' => 'Название организации',
    'name'         => 'ФИО контактного лица',
    'tel'          => 'Телефон',
    'email'        => 'Email',
    'message'      => 'Примечание',

    // Hidden calculator fields
    'users'        => 'Пользователей в месяц',
    'support'      => 'Поддержка в месяц',
    'months'       => 'Месяцев',
    'obuchenie'    => 'Обучение и настройка',
    'ipt'          => 'IP-телефония',
    'kkt'          => 'Контрольно кассовая техника',
    'egis3'        => 'ЕГИСЗ интеграция',
    'sms'          => 'СМС рассылка',
    'totalPrice'   => 'Итого',

    // Button tracking
    'buttonfrom'   => 'Откуда пришла заявка',
];

// ==== Build the HTML message ====
$message = "<h2>Новая заявка с сайта</h2>";
$message .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 100%; max-width: 600px;'>";
$message .= "<tbody>";

foreach ($fields as $key => $label) {
    if (isset($_POST[$key]) && strlen(trim($_POST[$key])) > 0) {
        $value = htmlspecialchars(trim($_POST[$key]), ENT_QUOTES, 'UTF-8');

        // Add ₽ for totalPrice
        if ($key === 'totalPrice') {
            $value .= ' ₽';
        }

        $message .= "<tr>";
        $message .= "<td style='font-weight: bold; background: #f0f0f0;'>$label</td>";
        $message .= "<td>$value</td>";
        $message .= "</tr>";
    }
}


$message .= "</tbody>";
$message .= "</table>";

// ==== Add page info ====
$page = $_SERVER['HTTP_REFERER'] ?? 'Сайт';
$subject = "Новая заявка ($page)";
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

// ==== Headers for HTML mail ====
$headers  = "From: " . mb_encode_mimeheader($fromName, "UTF-8") . " <$from>\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// ==== Send mail ====
if (mail($to, $subject, $message, $headers)) {
    echo "Ваше сообщение отправлено, спасибо!";
} else {
    echo "Ошибка при отправке письма.";
}
?>
