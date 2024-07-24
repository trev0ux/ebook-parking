<template>
    <section class="reservation-confirm">
        <div class="reservation-confirm__banner">
            <div class="container">
                <div class="reservation-confirm__details">
                    <!-- <h3>{{ content.name }}</h3> -->
                    <Breadcrumb />
                </div>
            </div>
        </div>
        <article class="reservation-confirm__payment-summary">
            <div class="container">
                <div class="reservation-confirm__thanks">
                    THANK YOU FOR BOOKING WITH US!
                </div>
                <div class="reservation-confirm__warning">
                    <h4>Please check all information below!
                    </h4>
                    <p>
                        You will also receive a confirmation email, please double check that you have entered the
                        correct
                        email
                        address, if this is not correct please take a picture of this page for confirmation.
                    </p>
                </div>
                <h5 class="reservation-confirm__payment-complete">Payment complete
                </h5>
                <section class="reservation-confirm__total-summary">
                    <h4>Resume Booking</h4>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div>
                        <p>Reservation number:
                        </p>
                        <p>Reservation number:
                        </p>
                    </div>
                    <div class="reservation-confirm__total">
                        <h6>Total Costs</h6>
                        <h6>€10.00
                        </h6>
                    </div>
                </section>
                <div class="reservation-confirm__buttons">
                    <div>
                        <ul class="progress-steps">
                            <li class="progress-steps--previous"></li>
                            <li class="progress-steps--previous"></li>
                            <li class="progress-steps--previous"></li>
                            <li class="progress-steps--active"></li>
                            <li></li>
                        </ul>
                    </div>
                    <NuxtLink class="btn btn-primary" to="/available-places">Vorige</NuxtLink>
                </div>
            </div>
        </article>
    </section>
</template>

<style>
@import "~/assets/styles/pages/reservation-confirmed.scss";
</style>
