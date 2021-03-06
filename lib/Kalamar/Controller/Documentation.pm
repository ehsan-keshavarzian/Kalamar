package Kalamar::Controller::Documentation;
use Mojo::Base 'Mojolicious::Controller';

# Show documentation page
sub page {
  my $c = shift;

  if ($c->param('embedded')) {
    $c->stash(embedded => 1);
  };

  my @path = ('doc');

  # There is a scope defined
  my $scope = $c->stash('scope');
  push(@path, $scope) if $scope;

  # Use the defined page
  my $page = $c->stash('page');
  push(@path, $page);

  # Set navigation to sidebar
  $c->content_for(
    sidebar => '<nav>' . $c->doc_navi($c->config('navi')) . '</nav>'
  );

  # Render template
  return $c->render(
    sidebar_active => 1,
    main_class     => 'tutorial',
    template       => $c->loc('Template_' . join('_', @path), join('/', @path))
  );
};


# Contact us
sub contact {
  my $c = shift;
  $c->render(
    template => $c->loc('contact', 'doc/contact')
  );
};


1;


__END__

=pod

=encoding utf8

=head1 NAME

Kalamar::Controller::Documentation


=head1 DESCRIPTION

L<Kalamar::Controller::Documentation> is the controller class for
documentation related endpoints in Kalamar.


=head1 METHODS

L<Kalamar::Controller::Documentation> inherits all methods from
L<Mojolicious::Controller> and implements the following new ones.

=head2 page

  /doc/*scope/:page

Action for all documentation pages.
The following query parameters are supported:

=over 2

=item B<embedded>

A boolean value, indicating if the documentation is embedded in the
user interface or on a separated website.

=back

The following path parameters are supported:

=over 2

=item B<scope>

A top level directory entry for documentation data (like C<KorAP> or C<Query Languages>).

=item B<page>

The requested page in the scope.

=back


=head2 contact

Action for a contact page. Doesn't do anything more meaningful at the moment but
will probably contain a form field for feedback in the future.


=head1 COPYRIGHT AND LICENSE

Copyright (C) 2015, L<IDS Mannheim|http://www.ids-mannheim.de/>
Author: L<Nils Diewald|http://nils-diewald.de/>

Kalamar is developed as part of the L<KorAP|http://korap.ids-mannheim.de/>
Corpus Analysis Platform at the Institute for German Language
(L<IDS|http://ids-mannheim.de/>),
funded by the
L<Leibniz-Gemeinschaft|http://www.leibniz-gemeinschaft.de/en/about-us/leibniz-competition/projekte-2011/2011-funding-line-2/>
and supported by the L<KobRA|http://www.kobra.tu-dortmund.de> project,
funded by the Federal Ministry of Education and Research
(L<BMBF|http://www.bmbf.de/en/>).

Kalamar is free software published under the
L<BSD-2 License|https://raw.githubusercontent.com/KorAP/Kalamar/master/LICENSE>.

=cut
