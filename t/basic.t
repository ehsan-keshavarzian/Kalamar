use Mojo::Base -strict;

use Test::More;
use Test::Mojo;

my $t = Test::Mojo->new('Korap');
$t->get_ok('/')
  ->status_is(200)
  ->content_like(qr/Go to/i);

done_testing();
