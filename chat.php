<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];
    if (!empty($message)) {
        $messages = file_get_contents('messages.json');
        $messages = json_decode($messages, true);
        $messages[] = htmlspecialchars($message);
        file_put_contents('messages.json', json_encode($messages));
    }
}
?>