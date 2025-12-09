export function getHtml(){
    return `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" lang="pt_BR">
        <head>
            <title>Liberi</title>
            <meta charset=utf-8" />
            <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> -->
            <meta name="description" content="Descrição da obra" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="format-detection" content="telephone=no"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="author" content="Lucas Leite Rondina, Eduardo de Souza, Sandro Alves Peres" />
            <meta name="title" content="Liberi" />
            <meta http-equiv="Expires" content="Mon, 26 Jul 1997 05:00:00 GMT" />
            <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
            <meta http-equiv="Cache-Control" content="post-check=0, pre-check=0" />
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
            <meta http-equiv="Pragma" content="no-cache" />
            <meta http-equiv="Cache" content="no-cache" />
            <title>Liberi</title>
            <link rel="icon" sizes="192x192" href="../../lib/resources/icons/nice-highres.png" />
            <link rel="icon" sizes="128x128" href="../../lib/resources/icons/niceicon.png" />
            <link rel="apple-touch-icon" sizes="128x128" href="../../lib/resources/icons/niceicon.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="128x128" href="../../lib/resources/icons/niceicon.png"/>
            <link rel="stylesheet" href="../../plugins/powerange/powerange.css"/>
            <link rel="stylesheet" href="../../lib/resources/styles/guid-web.css"/>

            <script src="../../lib/resources/scripts/jquery.js"></script>
            <script src="../../plugins/powerange/powerange.js"></script>
            <link rel="stylesheet" href="../../lib/resources/styles/guid-web.css">
            <link rel="stylesheet" href="../../lib/resources/styles/plataform.css">
        </head>
        <body class="colormode-default">
            <div class="ui-container">
                <div class="ui-content">
                    <div class="cont-loader">
                        <div class="cont-loadercontainer">

                            <div id="cont-animbook"></div>
                            <p>Carregando...</p>
                            <div class="ui-loadprogress">
                                <div class="ui-lpbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
     </html>
                    `
}