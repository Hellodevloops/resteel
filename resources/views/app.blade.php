<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Inline style to set the HTML background color --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }
    </style>

    <title>Resteel Solutions B.V.</title>

    <meta name="title" content="Resteel Solutions B.V.">
    <meta name="description" content="Resteel Solutions B.V. - Preparing sorted materials for recycling, Helmond.">
    <meta property="og:title" content="Resteel Solutions B.V.">
    <meta property="og:description" content="Sustainable solutions for material preparation and recycling.">
    <meta property="og:image" content="{{ asset('assets/ResteelSolutionsLogo.png') }}">
    <meta property="og:type" content="website">

    <link rel="icon" type="image/png" href="{{ asset('assets/ResteelSolutionsLogo.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/ResteelSolutionsLogo.png') }}">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>