use strict;
use warnings;

my @numbers = (10, 20, 30, 40, 50);

my $sum = 0;
$sum += $_ for @numbers;

my $average = $sum / scalar(@numbers);

print "Numbers: @numbers\n";
print "Sum: $sum\n";
print "Average: $average\n";
print "Maximum: ", (sort { $b <=> $a } @numbers)[0], "\n";
print "Minimum: ", (sort { $a <=> $b } @numbers)[0], "\n";

