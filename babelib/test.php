<?php

use phpDocumentor\Reflection\DocBlock\Tags\Var_;

$workId = 1;

function getWorkData($workId) {
    include('response.php');
    return json_decode($response);
};

// TODO 1001 одна ночь \ несколько авторов
function getAuthor($authors) {
    $result = '';

    foreach ($authors as $author) {
        $result .= $author->name;
    }

    return $result;
}

function getMovieData($films, $title = '', $addWithTheSameTitile = true, $skipShortLength = true) {
    $result = [];

    foreach ($films as $film) {
        if ($skipShortLength && $film->type == 50) { //TODO replace with constant
            continue;
        }

        if (!$addWithTheSameTitile && $film->rusname === $title) {
            continue;
        }
        // «Сияние» 1997, США, реж: Мик Гэррис
        $result[] = sprintf(
            "«%s» %s, %s, реж: %s", 
            $film->rusname,
            $film->year,
            $film->country,
            $film->director
        );
    }

    return $result;
}

function getGenreData($genres)
{
    $result = [];

    foreach ($genres as $genre) {
        $subgenres = $genre->genre;
        $subgenreLabels = [];

        foreach ($subgenres as $subgenre) {
            $subgenreLabels[] = $subgenre->label;
        }

        $result[$genre->label] = implode('|', $subgenreLabels);
    }

    return $result;
}

function getSimilars($workId)
{
    $result = [];
    require('similars.php');
    $similarsData = json_decode($similarsResponse);
    foreach ($similarsData as $item) {
        $result[] = $item->title;
    }

    return $result;
}

$workData = getWorkData($workId);
$author = getAuthor($workData->authors);
$title = $workData->work_name;
$fantlabId = $workData->work_id;
$year = $workData->work_year;
$movies = getMovieData($workData->films->screen_version, $title, true);
$genreData = getGenreData($workData->classificatory->genre_group);
$similars = getSimilars($workId);

// country
// translator

// line1
// line2
// line3
// line4
// line5
// line6
// first_line
// last_line

// cover

echo '<pre>';

var_dump($author);
var_dump($title);
var_dump($fantlabId);
var_dump($year);
var_dump($movies);
var_dump($genreData);
var_dump($similars);

?>


v-bind Dynamically bind one or more attributes, or a component prop to an expression.
v-cloak Used to hide un-compiled template until it is ready.
v-html Update the element's innerHTML.
v-memo Memoize a sub-tree of the template.
v-model Create a two-way binding on a form input element or a component.
v-on Attach an event listener to the element.
v-once Render the element and component once only, and skip future updates.
v-pre Skip compilation for this element and all its children.
v-show Toggle the element's visibility based on the truthy-ness of the expression value.
v-slot Denote named slots or scoped slots that expect to receive props.
v-text  Update the element's text content.