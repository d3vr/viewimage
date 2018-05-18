<?php
    $remote_version = file_get_contents("https://raw.githubusercontent.com/d3vr/viewimage/master/VERSION");
    $client_version = isset($_GET["v"]) ? $_GET["v"] : 0;

    // For some reason, remote version is unavailable
    if($remote_version==""){
        return header('Location: https://img.shields.io/badge/version_info_unavailable-N/A-orange.svg?style=for-the-badge');
    }
    // Client is up to date
    if($remote_version == $client_version){
        return header('Location: https://img.shields.io/badge/you_are_up_to_date-'.$remote_version.'-brightgreen.svg?style=for-the-badge');
    // Client is outdated
    }else{
        return header('Location: https://img.shields.io/badge/new_version_available-'.$remote_version.'-red.svg?style=for-the-badge');
    }
?>