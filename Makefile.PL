use 5.010001;
use strict;
use warnings;

use ExtUtils::MakeMaker;

WriteMakefile(
  VERSION_FROM => 'lib/Korap.pm',
  ABSTRACT     => 'Test Frontend for the KorAP API',
  NAME         => 'Korap',
  AUTHOR       => 'Nils Diewald',
  VERSION      => '0.01',
  BUILD_REQUIRES => {
    'Test::More' => 0
  },
  LICENSE      => 'artistic_2',
  PREREQ_PM => {
    'Mojolicious' => '4.92',
    'Mojolicious::Plugin::TagHelpers::Pagination' => 0.01,
    'Mojolicious::Plugin::Notifications' => 0.03,
    'Mojolicious::Plugin::CHI' => 0.09,
#    'Mojolicious::Plugin::Search' => 0.01,
    'Mojolicious::Plugin::Number::Commify' => '0.022',
    'JSON::XS' => 0.0
  },
  test => {
    TESTS => 't/*.t'
  }
);