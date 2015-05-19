use Mojo::Base -strict;
use lib '../lib', 'lib';
use Test::More skip_all => 'No remote tests';
use Test::Mojo;

my $t = Test::Mojo->new('Kalamar');
$t->get_ok('/')
  ->status_is(200)
  ->text_is('title', 'KorAP - Corpus Analysis Platform')
  ->text_like('h1 span', qr/KorAP - Corpus Analysis Platform/i)
  ;

# Check paging
$t->get_ok('/?q=test')
  ->text_like('h1 span', qr/KorAP: Find "test"/i)
  # ->text_is('pre.query.serial span', 'JSON-LD Serialization for "test"')
  ->text_like('#total-results', qr/\d+$/)
  ->text_is('#pagination a[rel=self] span', 1)
;

# Check paging
$t->get_ok('/?q=test&p=2')
  # ->text_is('pre.query.serial span', 'JSON-LD Serialization for "test"')
  ->text_like('#total-results', qr/\d+$/)
  ->text_is('#pagination a[rel=self] span', 2)
;

done_testing;
__END__
