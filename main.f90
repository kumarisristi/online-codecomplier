program main
    implicit none

    integer :: numbers(5)
    integer :: i
    integer :: total
    real :: average

    numbers = (/10, 20, 30, 40, 50/)
    total = 0

    print *, "Numbers:"

    do i = 1, 5
        print *, numbers(i)
        total = total + numbers(i)
    end do

    average = real(total) / 5.0

    print *, "Total:", total
    print *, "Average:", average
    print *, "Maximum:", maxval(numbers)
    print *, "Minimum:", minval(numbers)

end program main
