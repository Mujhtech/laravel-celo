<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @vite('resources/css/app.css')
</head>

<body>
    <div class="" id="example"></div>
    <script>
        var global = window
        window.config = {
            API_URL: '{{ url('/') }}/api/v1',
            BASE_URL: '{{ url('/') }}',
            APP: 'production'
        }
    </script>
    <script type="module">
        import RefreshRuntime from "http://localhost:5173/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    @vite('resources/js/app.js')
</body>

</html>
