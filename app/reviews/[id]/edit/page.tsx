import { getById } from '@/lib/dbUtils'
import { getUserById } from '@/lib/usuario'
import { updateReview, deleteReview } from '@/lib/review'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from '@/app/components/StarRating'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getCurrentUserId() {
    return parseInt(process.env.USER_ID || "0", 10);
}

export default async function EditReviewPage({ params }: { params: { id: string } }) {
    const reviewId = parseInt(params.id)
    const review = await getById('Avaliacao', reviewId)
    const currentUserId = await getCurrentUserId()

    if (!review) {
        return <div>Review not found</div>
    }

    const isAuthor = review.id_usuario_envia === currentUserId

    if (!isAuthor) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Unauthorized</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You are not authorized to edit this review.</p>
                    <Link href="/reviews">
                        <Button className="mt-4">Back to Reviews</Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const nota = parseInt(formData.get('nota') as string)
        const comentario = formData.get('comentario') as string

        await updateReview(reviewId, { nota, comentario })
        redirect('/reviews')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Review</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nota" className="block text-sm font-medium text-gray-700">Rating</label>
                            <Input
                                type="number"
                                id="nota"
                                name="nota"
                                min="1"
                                max="5"
                                defaultValue={review.nota}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="comentario" className="block text-sm font-medium text-gray-700">Comment</label>
                            <Textarea
                                id="comentario"
                                name="comentario"
                                rows={4}
                                defaultValue={review.comentario}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button type="submit">Update Review</Button>
                            <Link href="/reviews">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

