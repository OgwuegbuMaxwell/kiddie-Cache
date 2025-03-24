'use client'

import { ReviewType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "../rating";

export default function ReviewList({userId, productId, productSlug}: {
    userId: string;
    productId: string;
    productSlug: string;
}) {

    const [reviews, setReviews] = useState<ReviewType[]>([])

    useEffect(() => {
        const loadReviews = async () => {
            const res = await getReviews({productId});
            setReviews(res.data)
        }

        loadReviews();
    }, [productId])


    // This will relove review after either created or updated
    const reload = async () => {
        const res = await getReviews({productId})
        setReviews([...res.data])
    }

    
  return (
    <div className="space-y-4">
        {
            reviews.length === 0 && <div>No reviews yet</div>
        }

        {/* If user is logged in */}
        {
            userId ? (
            <div >
                <ReviewForm
                    userId={userId}
                    productId={productId}
                    onReviewSubmitted={reload}

                />
            </div>
            ) : (
                <div>
                    Please<Link href={`/sign-in?callbackUrl=/product/${productSlug}`} className="text-blue-700 px-1">
                    sign in
                    </Link>
                    to write a review
                </div>
            )
        }

        <div className=" flex flex-col gap-3">
           {
            reviews.map((review) => (
                <Card key={review.id}>
                    <CardHeader>
                        <div className="flex-between">
                            <CardTitle>{review.title}</CardTitle>
                        </div>
                        <CardDescription>
                            {review.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                            {/* RATING */}
                            <Rating value={review.rating}/>

                            <div className="flex items-center">
                                <User className="m-r h-3 w-3"/>
                                {
                                    review.user? review.user.name : 'User'
                                }
                            </div>

                            <div className="flex items-center">
                                <Calendar className="m-r h-3 w-3"/>
                                {
                                    formatDateTime(review.createdAt).dateTime
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
           }
        </div>


    </div>
  )
}
